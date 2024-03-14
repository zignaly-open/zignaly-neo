import { SxProps } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { ZigButton, ZigTypography, withAttrs, ZigLink } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import {
  HideReadMoreEffects,
  MarkdownContainer,
  StyledMarkdownWrapper,
} from '../styles';
import breaks from 'remark-breaks';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import remarkGfm from 'remark-gfm';

const MarkdownSection: React.FC<{
  title?: string;
  subtitle?: JSX.Element | string;
  readMore?: boolean;
  content: string;
  heightLimit?: number;
  emptyText?: string;
  sx?: SxProps;
  id?: string;
}> = ({ id, title, subtitle, readMore = true, content, emptyText, sx }) => {
  const { t } = useTranslation('action');
  const ref = useRef(null);
  const chunks = (content || '').trim().split(/\n+/).filter(Boolean);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(readMore);
  const [isTruncated, setIsTruncated] = useState(true);
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    setShouldShowReadMore(
      readMore && ref.current.scrollHeight > ref.current.clientHeight,
    );
  }, [content]);

  const Icon = isTruncated ? ExpandMore : ExpandLess;
  return (
    <StyledMarkdownWrapper sx={sx} mt={8} mb={4}>
      {title && (
        <ZigTypography
          variant={'h2'}
          sx={{ mb: 3 }}
          align='center'
          id={id && `${id}-title`}
        >
          {title}
        </ZigTypography>
      )}

      {subtitle}

      <HideReadMoreEffects
        ref={ref}
        truncate={shouldShowReadMore && isTruncated}
        lines={lg ? 9 : 5}
      >
        {chunks ? (
          <MarkdownContainer id={id}>
            <ReactMarkdown
              remarkPlugins={[breaks, remarkGfm]}
              linkTarget='_blank'
              components={{
                p: withAttrs(ZigTypography, { component: 'p' }),
                a: withAttrs(ZigLink),
                img: (props) => (
                  <img {...props} style={{ maxWidth: '400px' }} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </MarkdownContainer>
        ) : (
          <ZigTypography color={'neutral400'} id={id && `${id}-empty-text`}>
            {emptyText}
          </ZigTypography>
        )}
      </HideReadMoreEffects>

      {shouldShowReadMore && (
        <ZigButton
          variant={'text'}
          endIcon={
            <Icon sx={{ color: 'links', fill: 'currentColor !important' }} />
          }
          onClick={() => setIsTruncated((v) => !v)}
          id={id && `${id}-more-less-button`}
        >
          {isTruncated ? t('more') : t('less')}
        </ZigButton>
      )}
    </StyledMarkdownWrapper>
  );
};

export default MarkdownSection;
