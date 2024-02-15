import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { withReact, Slate } from 'slate-react';
import { createEditor, Descendant } from 'slate';
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
import { ErrorMessage, ZigButton, ZigTypography } from '@zignaly-open/ui';
import { StyledEditable } from './styles';
import { RenderElementType, RenderLeafType } from '../../types';
import { SxProps } from '@mui/system';
import { HideReadMoreEffects } from '../../../ServiceProfileContainer/styles';
import { useTranslation } from 'react-i18next';

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
}: {
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
  const renderElement = useCallback(
    (p: RenderElementType) => <Element {...p}>{p.children}</Element>,
    [],
  );
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const renderLeaf = useCallback(
    (p: RenderLeafType) => <Leaf {...p}>{p.children}</Leaf>,
    [],
  );
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
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
            <Box display={'flex'}>
              <MarkButton format='bold' icon={<FormatBoldOutlined />} />
              <MarkButton format='italic' icon={<FormatItalicOutlined />} />
              <MarkButton format='underline' icon={<FormatUnderlined />} />
              <MarkButton format='code' icon={<Code />} />
              <MarkButton format='link' icon={<Link />} />
              <BlockButton format='heading-one' icon={<LooksOne />} />
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
            </Box>
          )}

          <StyledEditable
            id={id}
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
