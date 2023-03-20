import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { ZignalyLogotype } from '@zignaly-open/ui';
import { ReactComponent as Envelope } from '../../../images/envelope-main.svg';

// hardcoded values
// TODO: move to config along with the other hardcoded values for rewards
const depositAmount = 100;
const depositReward = 20;

// svg controls
const qrCodeWidth = 100;
const imageHeight = 600;
const imageWidth = 480;
const logoHeight = 70;
const qrCodePadding = 10;
const sidePadding = 35;
const qrCodeBorderRadius = 10;
const sectionRatio = 0.45;
const borderRadius = 15;

const ReferralInviteImage: React.FC<{
  mode: 'trader' | 'friend';
  url: string;
  urlShort: string;
}> = ({ mode, url, urlShort }) => {
  const { t } = useTranslation(['referrals', 'pages']);

  return (
    <svg
      width={imageWidth}
      height={imageHeight}
      viewBox={`0 0 ${imageWidth}px ${imageHeight}px`}
    >
      <defs>
        <clipPath id='round-corner'>
          <rect
            x='0'
            y='0'
            width={imageWidth}
            height={imageHeight}
            rx={borderRadius}
            ry={borderRadius}
          />
        </clipPath>
        <style type='text/css'>
          {`
          
          @font-face {
            font-family: "Avenir Next";
            src: url("/fonts/AvenirNext/AvenirNextLTPro-Regular.otf");
          }
          
          @font-face {
            font-family: "Avenir Next";
            src: url("../public/fonts/AvenirNext/AvenirNextLTPro-SemiBold.otf");
            font-weight: 700;
          }
          
          * {
            font-family: "Avenir Next";
            line-height: 1.4;
          }
         
          
          `}
        </style>
      </defs>

      <linearGradient id='bottomPartGradient' x1={1} y1={1} x2={0} y2={0}>
        <stop offset={0} stopColor='#21133a' />
        <stop offset={1} stopColor='#332256' />
      </linearGradient>
      <linearGradient id='ctaGradient' x1={1} y1={0} x2={1} y2={1}>
        <stop offset={0} stopColor='#84ccd6' />
        <stop offset={1} stopColor='#a58fd8' />
      </linearGradient>
      <linearGradient id='topPartGradient' x1={0} y1={0} x2={1} y2={1}>
        <stop offset={0} stopColor='#110425' />
        <stop offset={0.2} stopColor='#382860' />
        <stop offset={0.200001} stopColor='#14082c' />
        <stop offset={0.25} stopColor='#100327' />
        <stop offset={1} stopColor='#21004d' />
      </linearGradient>

      <rect
        clip-path='url(#round-corner)'
        fill='url(#topPartGradient)'
        width={imageWidth}
        x={0}
        y={0}
        height={imageHeight / (1 + sectionRatio)}
      ></rect>
      <rect
        clip-path='url(#round-corner)'
        fill='url(#bottomPartGradient)'
        width={imageWidth}
        x={0}
        y={imageHeight / (1 + sectionRatio)}
        height={(sectionRatio * imageHeight) / (1 + sectionRatio)}
      ></rect>

      {t(`create-invite.${mode}-cta`)
        .split('\n')
        .map((text, i) => (
          <text
            key={`referral-cta-line-${i}`}
            x={sidePadding}
            y={2 * sidePadding + logoHeight + 43 + i * 50}
            fontFamily={"'Avenir Next', arial, sans-serif"}
            fontSize={38}
            fontWeight={700}
            fill='url(#ctaGradient)'
          >
            {text}
          </text>
        ))}

      <Envelope
        width={(imageWidth - 3 * sidePadding) / 3}
        height={((imageWidth - 3 * sidePadding) / 3 / 291) * 259}
        x={((imageWidth - 3 * sidePadding) / 3) * 2 + 2 * sidePadding}
        y={2 * sidePadding + logoHeight}
      />

      <ZignalyLogotype
        y={sidePadding}
        x={sidePadding}
        height={logoHeight}
        width={logoHeight * 4}
      />

      <foreignObject
        x={sidePadding}
        y={imageHeight / (1 + sectionRatio) - 75 - sidePadding}
        width={imageWidth - 2 * sidePadding}
        height={90}
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            height: (sectionRatio * imageHeight) / (1 + sectionRatio) + 'px',
            fontFamily: "'Avenir Next', arial, sans-serif",
            lineHeight: 1.4,
            fontSize: 23,
            color: '#A9A9BA',
          }}
        >
          <Trans
            i18nKey={'create-invite.deposit-cta'}
            t={t}
            values={{
              depositAmount,
              depositReward,
            }}
          >
            <span style={{ color: '#a58fe5' }} />
            <span style={{ color: '#a58fe5' }} />
          </Trans>
        </div>
      </foreignObject>

      <foreignObject
        x={sidePadding}
        y={imageHeight / (1 + sectionRatio)}
        width={imageWidth - 3 * sidePadding - 2 * qrCodePadding - qrCodeWidth}
        height={(sectionRatio * imageHeight) / (1 + sectionRatio)}
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: (sectionRatio * imageHeight) / (1 + sectionRatio) + 'px',
            flex: 1,
            justifyContent: 'space-around',
            fontFamily: "'Avenir Next', arial, sans-serif",
            lineHeight: 1.4,
          }}
        >
          <div>
            <span style={{ color: '#A9A9BA', fontSize: 20 }}>
              {t('create-invite.scan-qr')}
            </span>
            <br />
            <span style={{ color: '#a58fe5', fontSize: 14 }}>
              {urlShort
                .replace(/https?:\/\//, '')
                .replace(/(?:test|staging)-app\./, 'app.')}
            </span>
          </div>
        </div>
      </foreignObject>

      <g>
        <rect
          rx={qrCodeBorderRadius}
          ry={qrCodeBorderRadius}
          x={imageWidth - qrCodeWidth - 2 * qrCodePadding - sidePadding}
          y={
            ((1 + 0.5 * sectionRatio) * imageHeight) / (1 + sectionRatio) -
            qrCodeWidth / 2 -
            qrCodePadding
          }
          width={qrCodeWidth + 2 * qrCodePadding}
          height={qrCodeWidth + 2 * qrCodePadding}
          fill={'#fff'}
        />
        <QRCodeSVG
          y={
            ((1 + 0.5 * sectionRatio) * imageHeight) / (1 + sectionRatio) -
            qrCodeWidth / 2
          }
          x={imageWidth - qrCodeWidth - qrCodePadding - sidePadding}
          height={qrCodeWidth}
          size={qrCodeWidth}
          value={url}
        />
      </g>
    </svg>
  );
};

export default ReferralInviteImage;
