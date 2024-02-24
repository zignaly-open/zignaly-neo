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
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Descendant,
} from 'slate';
import { withHistory } from 'slate-history';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import {
  BlockButton,
  Leaf,
  MarkButton,
  Element,
  InsertImageButton,
  InsertLinkButton,
  RemoveLinkButton,
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
  Code,
  Image,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  ExpandMore,
  ExpandLess,
  Link,
  LinkOff,
} from '@mui/icons-material';
import { withImages, withInlines, withShortcuts } from './atoms/util';
import {
  ErrorMessage,
  ZigButton,
  ZigTypography,
  ZigSwitch,
} from '@zignaly-open/ui';
import { StyledEditable } from './styles';
import { SxProps } from '@mui/system';
import { HideReadMoreEffects } from '../../../ServiceProfileContainer/styles';
import { useTranslation } from 'react-i18next';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { SHORTCUTS } from './constants';

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
  value: Descendant[];
  readOnly?: boolean;
  readMore?: boolean;
  setValue?: (v: Descendant[]) => void;
  sx?: SxProps;
  subtitle?: JSX.Element | string;
}) => {
  const { t } = useTranslation('action');
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  const renderLeaf = useCallback(
    (p: RenderLeafProps) => <Leaf {...p}>{p.children}</Leaf>,
    [],
  );
  const renderElement = useCallback(
    (p: RenderElementProps) => <Element {...p}>{p.children}</Element>,
    [],
  );

  const editor = useMemo(
    () =>
      withShortcuts(
        withInlines(withImages(withHistory(withReact(createEditor())))),
      ),
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
              <MarkButton format='code' icon={<Code />} />
              <BlockButton format='heading_one' icon={<LooksOne />} />
              <BlockButton format='heading_two' icon={<LooksTwo />} />
              <BlockButton format='heading_three' icon={<Looks3 />} />
              <BlockButton format='heading_four' icon={<Looks4 />} />
              <BlockButton format='heading_five' icon={<Looks5 />} />
              <BlockButton format='heading_six' icon={<Looks6 />} />
              <BlockButton
                format='block_quote'
                icon={<FormatQuoteOutlined />}
              />
              <BlockButton format='ol_list' icon={<FormatListNumbered />} />
              <BlockButton format='ul_list' icon={<FormatListBulleted />} />
              <BlockButton format='left' icon={<FormatAlignLeft />} />
              <BlockButton format='center' icon={<FormatAlignCenter />} />
              <BlockButton format='right' icon={<FormatAlignRight />} />
              <BlockButton format='justify' icon={<FormatAlignJustify />} />
              <InsertImageButton icon={<Image />} />
              <InsertLinkButton icon={<Link />} />
              <RemoveLinkButton icon={<LinkOff />} />
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

export default RichDescriptionEditor;
