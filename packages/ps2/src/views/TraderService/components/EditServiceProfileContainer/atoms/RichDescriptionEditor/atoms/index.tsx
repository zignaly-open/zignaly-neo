import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  useFocused,
  useSelected,
  useSlate,
  useSlateStatic,
} from 'slate-react';
import { Box } from '@mui/material';
import React, { CSSProperties } from 'react';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import {
  insertImage,
  insertLink,
  isImageUrl,
  isLinkActive,
  unwrapLink,
} from './util';
import { ZigCrossIcon } from '@zignaly-open/ui/icons';
import { SlateElementTypeFieldTypes } from '../../../types';
import { useZPrompt } from '../../../../../../../components/ZModal/use';
import { useTranslation } from 'react-i18next';
import { ZigLink } from '@zignaly-open/ui';
import { ImageElement } from '../../../../../../../customSlateTypes';
import { LIST_TYPES, TEXT_ALIGN_TYPES } from '../constants';
import isUrl from 'is-url';

export const BlockButton = ({
  format,
  icon,
}: {
  format: SlateElementTypeFieldTypes;
  icon: JSX.Element;
}) => {
  const editor = useSlate();

  const isBlockActive = (
    editorActive: Editor,
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

  const toggleBlock = (
    editorToggle: Editor,
    formatToggle: SlateElementTypeFieldTypes,
  ) => {
    const isActive = isBlockActive(
      editorToggle,
      formatToggle,
      TEXT_ALIGN_TYPES.includes(formatToggle) ? 'align' : 'type',
    );
    const isList = LIST_TYPES.includes(formatToggle);

    Transforms.unwrapNodes(editorToggle, {
      match: (n: SlateElement) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(formatToggle),
      split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(formatToggle)) {
      newProperties = {
        align: isActive ? undefined : formatToggle,
      };
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list_item' : formatToggle,
      };
    }
    Transforms.setNodes(editorToggle, newProperties);

    if (!isActive && isList) {
      const block = { type: formatToggle, children: [] } as SlateElement;
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

  const isMarkActive = (editorActive: Editor, formatActive: string) => {
    const marks = Editor.marks(editorActive);
    return marks ? marks[formatActive] === true : false;
  };

  const toggleMark = (editorToggle: Editor, formatToggle: string) => {
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

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf?.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  return <span {...attributes}>{children}</span>;
};

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const style = {
    textAlign: element.align,
    listStyleType: 'unset',
  } as CSSProperties;
  switch (element.type) {
    case 'block_quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'ul_list':
      return (
        <ul style={{ ...style, listStyleType: 'disc' }} {...attributes}>
          {children}
        </ul>
      );
    case 'heading_one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading_two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'heading_three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case 'heading_four':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case 'heading_five':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case 'heading_six':
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case 'list_item':
      return (
        <li style={{ ...style, marginLeft: '25px' }} {...attributes}>
          {children}
        </li>
      );
    case 'ol_list':
      return (
        <ol style={{ ...style, listStyleType: 'decimal' }} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      return (
        <Image attributes={attributes} element={element}>
          {children}
        </Image>
      );

    case 'link':
      return (
        <ZigLink {...attributes} href={element.link}>
          {children}
        </ZigLink>
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
}: RenderElementProps & { element: ImageElement }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor as ReactEditor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <Box {...attributes}>
      {children}
      <Box contentEditable={false} sx={{ position: 'relative' }}>
        <img
          alt={element.link}
          src={element.link}
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

export const InsertLinkButton = ({ icon }: { icon: JSX.Element }) => {
  const editor = useSlateStatic();

  const { t } = useTranslation('service');

  const askUrl = useZPrompt();
  return (
    <Box
      sx={{
        color: isLinkActive(editor) ? 'neutral 100' : 'neutral500',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        askUrl({
          title: t('edit.insert-link-modal.title'),
          confirmAction: (url: string) => {
            url && insertLink(editor, url);
          },
          rulesFunction: (url) => isUrl(url),
          placeholder: t('edit.insert-link-modal.placeholder'),
          warning: t('edit.insert-link-modal.warning'),
        });
      }}
    >
      {icon}
    </Box>
  );
};

export const RemoveLinkButton = ({ icon }: { icon: JSX.Element }) => {
  const editor = useSlateStatic();

  return (
    <Box
      sx={{
        color: isLinkActive(editor) ? 'neutral 100' : 'neutral500',
      }}
      onMouseDown={() => {
        if (isLinkActive(editor)) {
          unwrapLink(editor);
        }
      }}
    >
      {icon}
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
            url && insertImage(editor, url);
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
