import { BaseEditor, Descendant, Transforms } from 'slate';
import imageExtensions from 'image-extensions';
import { ReactEditor } from 'slate-react';
import { RichEditorElement } from '../../../types';

export const insertImage = (editor: BaseEditor, url: string) => {
  const text = { text: '' };
  const image: {
    type: string;
    url: string;
    children: Array<{ text: string }>;
  } = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
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

export const withImages = (editor: ReactEditor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element: RichEditorElement) => {
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

export function serialize(obj: Descendant[]) {
  return JSON.stringify(obj, (key, value) => {
    if (value && typeof value === 'object' && value.type === 'paragraph') {
      const { type, ...rest } = value;
      return rest;
    }
    return value;
  });
}

export function deserialize(serialized: string) {
  if (!serialized) {
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
  }

  try {
    const obj = JSON.parse(serialized);

    if (Array.isArray(obj)) {
      return obj.map((item: RichEditorElement) => {
        return {
          type: 'paragraph',
          align: item.align || undefined,
          children: item.children || [],
        };
      });
    } else {
      return [
        {
          type: 'paragraph',
          children: [{ text: obj.toString() }],
        },
      ];
    }
  } catch (e) {
    return [
      {
        type: 'paragraph',
        children: [{ text: serialized }],
      },
    ];
  }
}
