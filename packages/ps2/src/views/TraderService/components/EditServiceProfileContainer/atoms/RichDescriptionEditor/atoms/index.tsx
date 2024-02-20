import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlate,
  useSlateStatic,
} from 'slate-react';
import { Box } from '@mui/material';
import React, { CSSProperties } from 'react';
import {
  BaseEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
} from 'slate';
import { insertImage, isImageUrl } from './util';
import { ZigCrossIcon } from '@zignaly-open/ui/icons';
import {
  RenderElementType,
  RenderLeafType,
  RichEditorElement,
} from '../../../types';
import { useZPrompt } from '../../../../../../../components/ZModal/use';
import { useTranslation } from 'react-i18next';

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: JSX.Element;
}) => {
  const editor = useSlate();

  const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
  const LIST_TYPES = ['numbered-list', 'bulleted-list'];

  const isBlockActive = (
    editorActive: BaseEditor,
    formatActive: string,
    blockType = 'type',
  ) => {
    const { selection } = editorActive;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editorActive, {
        at: Editor.unhangRange(editorActive, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === formatActive,
      }),
    );

    return !!match;
  };

  const toggleBlock = (editorToggle: BaseEditor, formatToggle: string) => {
    const isActive = isBlockActive(
      editorToggle,
      formatToggle,
      TEXT_ALIGN_TYPES.includes(formatToggle) ? 'align' : 'type',
    );
    const isList = LIST_TYPES.includes(formatToggle);

    Transforms.unwrapNodes(editorToggle, {
      match: (n: RichEditorElement) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(formatToggle),
      split: true,
    });
    let newProperties: Partial<RichEditorElement>;
    if (TEXT_ALIGN_TYPES.includes(formatToggle)) {
      newProperties = {
        align: isActive ? undefined : formatToggle,
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : formatToggle,
      };
    }
    Transforms.setNodes<RichEditorElement>(editorToggle, newProperties);

    if (!isActive && isList) {
      const block = { type: formatToggle, children: [] as Descendant[] };
      Transforms.wrapNodes(editorToggle, block);
    }
  };

  return (
    <Box
      id={`rich-description-editor__${format}-button`}
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        color: isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
        )
          ? 'neutral 100'
          : 'neutral500',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Box>
  );
};

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: JSX.Element;
}) => {
  const editor = useSlate();

  const isMarkActive = (editorActive: BaseEditor, formatActive: string) => {
    const marks = Editor.marks(editorActive);
    return marks ? marks[formatActive] === true : false;
  };

  const toggleMark = (editorToggle: BaseEditor, formatToggle: string) => {
    const isActive = isMarkActive(editorToggle, formatToggle);

    if (isActive) {
      Editor.removeMark(editorToggle, formatToggle);
    } else {
      Editor.addMark(editorToggle, formatToggle, true);
    }
  };

  return (
    <Box
      id={`rich-description-editor__${format}-button`}
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        color: isMarkActive(editor, format) ? 'neutral 100' : 'neutral500',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Box>
  );
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafType) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementType) => {
  const style = {
    textAlign: element.align,
    listStyleType: 'unset',
  } as CSSProperties;
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={{ ...style, listStyleType: 'disc' }} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={{ ...style, marginLeft: '25px' }} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={{ ...style, listStyleType: 'decimal' }} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      return (
        <Image
          attributes={attributes}
          element={element as RichEditorElement & { url: string }}
        >
          {children}
        </Image>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Image = ({
  attributes,
  children,
  element,
}: RenderElementType & { element: RichEditorElement & { url: string } }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor as ReactEditor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <Box {...attributes}>
      {children}
      <Box contentEditable={false} sx={{ position: 'relative' }}>
        <img
          src={element.url}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '20em',
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
            margin: '5px',
          }}
        />
        <Box
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          sx={{
            display: selected && focused ? 'inline' : 'none',
            position: 'absolute',
            top: '0.5em',
            left: '0.5em',
          }}
        >
          <ZigCrossIcon />
        </Box>
        <p></p>
      </Box>
    </Box>
  );
};

export const InsertImageButton = ({ icon }: { icon: JSX.Element }) => {
  const editor = useSlateStatic();
  const { t } = useTranslation('service');
  const askUrl = useZPrompt();
  return (
    <Box
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        color: 'neutral500',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        askUrl({
          title: t('edit.insert-image-modal.title'),
          confirmAction: (url: string) => {
            url && insertImage(editor as ReactEditor, url);
          },
          rulesFunction: (url) => {
            return isImageUrl(url);
          },
          warning: t('edit.insert-image-modal.warning'),
          placeholder: t('edit.insert-image-modal.placeholder'),
        });
      }}
    >
      {icon}
    </Box>
  );
};
