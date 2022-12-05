import { Box } from '@mui/system';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { HideReadMoreEffects, MarkdownContainer } from '../styles';
import breaks from 'remark-breaks';

const MarkdownSection: React.FC<{
  title: string;
  subtitle?: JSX.Element | string;
  readMore?: boolean;
  content: string;
  heightLimit?: number;
  emptyText: string;
}> = ({
  title,
  subtitle,
  readMore = true,
  heightLimit = 120,
  content,
  emptyText,
}) => {
  const { t } = useTranslation('action');
  const ref = useRef();
  const chunks = (content || '').trim().split(/\n+/).filter(Boolean);
  const { scrollHeight = 0, clientHeight = 0 } =
    ref?.current || ({} as { scrollHeight: number; clientHeight: number });

  const [shown, setShown] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(readMore);
  const delta = 24 * 2;

  useLayoutEffect(() => {
    if (scrollHeight && clientHeight && scrollHeight - delta < heightLimit) {
      setShouldShowReadMore(false);
    }
  }, [clientHeight && scrollHeight]);

  useLayoutEffect(() => {
    if (
      scrollHeight &&
      clientHeight &&
      scrollHeight > clientHeight &&
      scrollHeight - delta < clientHeight
    ) {
      setShown(true);
    }
  }, [scrollHeight, clientHeight]);

  const Icon = shown ? RemoveIcon : AddIcon;
  return (
    <Box mt={8} mb={4}>
      <ZigTypography variant={'h2'} sx={{ mb: 1 }}>
        {title}
      </ZigTypography>
      {subtitle}

      <HideReadMoreEffects
        ref={ref}
        open={shown || !shouldShowReadMore}
        heightLimit={heightLimit}
      >
        {chunks.length ? (
          <MarkdownContainer>
            <ReactMarkdown remarkPlugins={[breaks]} linkTarget='_blank'>
              {content}
            </ReactMarkdown>
          </MarkdownContainer>
        ) : (
          <ZigTypography color={'neutral400'}>{emptyText}</ZigTypography>
        )}
      </HideReadMoreEffects>

      {shouldShowReadMore && (
        <TextButton
          leftElement={
            <Icon sx={{ color: '#65647E' }} width={16} height={16} />
          }
          caption={shown ? t('read-less') : t('read-more')}
          color={'links'}
          onClick={() => setShown((v) => !v)}
        />
      )}
    </Box>
  );
};

export default MarkdownSection;
