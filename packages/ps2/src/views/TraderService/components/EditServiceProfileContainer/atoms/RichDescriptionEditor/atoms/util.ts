import { Editor, Transforms, Element as SlateElement } from 'slate';
import imageExtensions from 'image-extensions';

export const insertImage = (editor: Editor, url: string) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image as SlateElement);
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

export function serialize(obj: SlateElement[]) {
  return JSON.stringify(obj, (key, value) => {
    if (value && typeof value === 'object' && value.type === 'paragraph') {
      const { type, ...rest } = value;
      return rest;
    }
    return value;
  });
}

export function deserialize(serialized: string): SlateElement[] {
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
      return obj;
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
