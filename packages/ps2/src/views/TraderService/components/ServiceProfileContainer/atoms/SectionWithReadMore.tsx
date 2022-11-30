import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next';
import { HideReadMoreEffects } from '../styles';

type Content = string | JSX.Element;

const SectionWithReadMore: React.FC<{
  title: Content;
  subtitle?: Content;
  content: string;
  heightLimit?: number;
  emptyText: string;
}> = ({ title, subtitle, heightLimit = 120, content, emptyText }) => {
  const { t } = useTranslation('action');
  const ref = useRef();
  const chunks = (content || '').trim().split(/\n+/).filter(Boolean);
  const { scrollHeight = 0, clientHeight = 0 } =
    ref?.current || ({} as { scrollHeight: number; clientHeight: number });

  const [shown, setShown] = useState(false);
  const delta = 24 * 2;
  const shouldShowReadMore = scrollHeight - delta > heightLimit;

  useEffect(() => {
    if (scrollHeight > clientHeight && scrollHeight - delta < clientHeight) {
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
      <HideReadMoreEffects ref={ref} open={shown} heightLimit={heightLimit}>
        {chunks.length ? (
          chunks.map((c, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <ZigTypography key={`${Math.random()}_${i}`}>{c}</ZigTypography>
          ))
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

export default SectionWithReadMore;
