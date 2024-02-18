import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  withReact,
  Slate,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Range,
  Transforms,
  Point,
} from 'slate';
import { withHistory } from 'slate-history';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import {
  BlockButton,
  Leaf,
  MarkButton,
  Element,
  InsertImageButton,
} from './atoms';
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatQuoteOutlined,
  FormatListNumbered,
  FormatListBulleted,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatUnderlined,
  Code,
  Image,
  LooksOne,
  LooksTwo,
  ExpandMore,
  ExpandLess,
  Link,
} from '@mui/icons-material';
import { withImages } from './atoms/util';
import {
  ErrorMessage,
  ZigButton,
  ZigTypography,
  ZigSwitch,
} from '@zignaly-open/ui';
import { StyledEditable } from './styles';
import { SlateElementTypeFieldTypes } from '../../types';
import { SxProps } from '@mui/system';
import { HideReadMoreEffects } from '../../../ServiceProfileContainer/styles';
import { useTranslation } from 'react-i18next';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
};

const RichDescriptionEditor = ({
  id,
  label,
  error,
  value,
  setValue,
  readOnly,
  readMore,
  subtitle,
  sx,
  ...props
}: Partial<ControllerRenderProps> & {
  id: string;
  label?: string | JSX.Element;
  error?: string;
  value: SlateElement[];
  readOnly?: boolean;
  readMore?: boolean;
  setValue?: (v: Descendant[]) => void;
  sx?: SxProps;
  subtitle?: JSX.Element | string;
}) => {
  const { t } = useTranslation('action');
  const renderElement = useCallback(
    (p: RenderElementProps) => <Element {...p}>{p.children}</Element>,
    [],
  );
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const renderLeaf = useCallback(
    (p: RenderLeafProps) => <Leaf {...p}>{p.children}</Leaf>,
    [],
  );

  const editor = useMemo(
    () => withShortcuts(withImages(withHistory(withReact(createEditor())))),
    [],
  );

  const ref = useRef(null);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(readMore);
  const [isTruncated, setIsTruncated] = useState(true);

  useEffect(() => {
    setShouldShowReadMore(
      readMore && ref.current.scrollHeight > ref.current.clientHeight,
    );
  }, [value]);

  const Icon = isTruncated ? ExpandMore : ExpandLess;

  const handleDOMBeforeInput = useCallback(() => {
    queueMicrotask(() => {
      const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

      const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
        if (!diff.text.endsWith(' ')) {
          return false;
        }

        const { text } = SlateNode.leaf(editor, path);
        const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
        if (!(beforeText in SHORTCUTS)) {
          return;
        }

        const blockEntry = Editor.above(editor, {
          at: path,
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });
        if (!blockEntry) {
          return false;
        }

        const [, blockPath] = blockEntry;
        return Editor.isStart(editor, Editor.start(editor, path), blockPath);
      });

      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor);
      }
    });
  }, [editor]);

  return (
    <Box
      sx={{
        color: 'neutral200',
        fontSize: '15px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        ...sx,
      }}
    >
      {typeof label === 'string' ? (
        <ZigTypography
          variant={'h2'}
          sx={{ mb: 2 }}
          align='center'
          id={id && `${id}-title`}
        >
          {label}
        </ZigTypography>
      ) : (
        label
      )}
      {subtitle}
      <HideReadMoreEffects
        ref={ref}
        truncate={shouldShowReadMore && isTruncated}
        lines={lg ? 9 : 5}
      >
        <Slate
          editor={editor}
          onChange={readOnly ? null : (v) => setValue(v)}
          initialValue={value}
        >
          {!readOnly && (
            <Box display={'flex'} alignItems={'center'}>
              <MarkButton format='bold' icon={<FormatBoldOutlined />} />
              <MarkButton format='italic' icon={<FormatItalicOutlined />} />
              <MarkButton format='underline' icon={<FormatUnderlined />} />
              <MarkButton format='code' icon={<Code />} />
              <MarkButton format='link' icon={<Link />} />
              <BlockButton format='heading' icon={<LooksOne />} />
              <BlockButton format='heading-two' icon={<LooksTwo />} />
              <BlockButton
                format='block-quote'
                icon={<FormatQuoteOutlined />}
              />
              <BlockButton
                format='numbered-list'
                icon={<FormatListNumbered />}
              />
              <BlockButton
                format='bulleted-list'
                icon={<FormatListBulleted />}
              />
              <BlockButton format='left' icon={<FormatAlignLeft />} />
              <BlockButton format='center' icon={<FormatAlignCenter />} />
              <BlockButton format='right' icon={<FormatAlignRight />} />
              <BlockButton format='justify' icon={<FormatAlignJustify />} />
              <InsertImageButton icon={<Image />} />
              <ZigSwitch sx={{ marginLeft: 'auto' }} />
            </Box>
          )}

          <StyledEditable
            {...props}
            id={id}
            onDOMBeforeInput={handleDOMBeforeInput}
            error={!!error}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            readOnly={readOnly}
          />
        </Slate>
        {error && <ErrorMessage text={error} />}
      </HideReadMoreEffects>
      {shouldShowReadMore && (
        <ZigButton
          variant={'text'}
          endIcon={
            <Icon sx={{ color: 'links', fill: 'currentColor !important' }} />
          }
          onClick={() => setIsTruncated((v) => !v)}
          id={id && `${id}-more-less-button`}
          sx={{ justifyContent: 'left' }}
        >
          {isTruncated ? t('more') : t('less')}
        </ZigButton>
      )}
    </Box>
  );
};

const withShortcuts = (editor: Editor) => {
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

        if (type === 'list-item') {
          const list: SlateElement = {
            type: 'bulleted-list',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n: SlateElement) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === 'list-item',
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

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === 'bulleted-list',
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

export default RichDescriptionEditor;
