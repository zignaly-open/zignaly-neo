import {
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
  Point,
} from 'slate';
import imageExtensions from 'image-extensions';
import slate, { serialize } from 'remark-slate';
import { unified } from 'unified';
import markdown from 'remark-parse';
import isUrl from 'is-url';
import { SlateElementTypeFieldTypes } from '../../../types';
import { SHORTCUTS } from '../constants';

export const insertImage = (editor: Editor, url: string) => {
  const text = { text: '' };
  const image = { type: 'image', link: url, children: [text] };
  Transforms.insertNodes(editor, image as SlateElement);
};

export const withShortcuts = (editor: Editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);
      const type = SHORTCUTS[beforeText];

      if (type as SlateElementTypeFieldTypes) {
        Transforms.select(editor, range);

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }

        const newProperties: Partial<SlateElement> = {
          type,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });

        if (type === 'list_item') {
          const list: SlateElement = {
            type: 'ul_list',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n: SlateElement) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === 'list_item',
          });
        }

        return;
      }
    }

    insertText(text);
  };
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === 'list_item') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === 'ul_list',
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n: SlateElement) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

export const withInlines = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ['link', 'button', 'badge'].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    link: url,
    children: isCollapsed ? [{ text: url }] : [],
  } as SlateElement;

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    }),
  );
  return !!link;
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  try {
    const ext = new URL(url).pathname.split('.').pop();
    return imageExtensions.includes(ext);
  } catch (e) {
    return false;
  }
};

export const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url as string);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export function serializeSlate(obj: SlateElement[]) {
  return obj.map((v) => serialize(v)).join('\n');
}

export function deserializeSlate(serialized: string): SlateElement[] {
  if (!serialized)
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
  const result = unified().use(markdown).use(slate).processSync(serialized);
  return result.result as SlateElement[];
}
