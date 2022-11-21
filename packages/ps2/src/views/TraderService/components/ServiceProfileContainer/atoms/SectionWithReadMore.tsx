import { Box } from '@mui/system';
import React from 'react';
import { PlusIcon, TextButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
// this thing has no declarations
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReadMore from '@crossfield/react-read-more';
import { HideReadMoreEffects } from '../styles';

type Content = string | JSX.Element;

const SectionWithReadMore: React.FC<{
  title: Content;
  subtitle?: Content;
  content: string;
  emptyText: string;
}> = ({ title, subtitle, content, emptyText }) => {
  const { t } = useTranslation('action');
  const chunks = (content || '').trim().split(/\n+/).filter(Boolean);
  return (
    <Box mt={4} mb={4}>
      <ZigTypography variant={'h2'} sx={{ mb: 1 }}>
        {title}
      </ZigTypography>
      {subtitle}
      <HideReadMoreEffects>
        <ReadMore
          initialHeight={350}
          readMore={(props: { open: boolean; onClick: () => void }) =>
            !props.open && (
              <TextButton
                leftElement={
                  <PlusIcon color='#65647E' width={16} height={16} />
                }
                caption={t('read-more')}
                color={'links'}
                onClick={props.onClick}
              />
            )
          }
        >
          {chunks.length ? (
            chunks.map((c, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ZigTypography key={`${Math.random()}_${i}`}>{c}</ZigTypography>
            ))
          ) : (
            <ZigTypography color={'neutral400'}>{emptyText}</ZigTypography>
          )}
        </ReadMore>
      </HideReadMoreEffects>
    </Box>
  );
};

export default SectionWithReadMore;
