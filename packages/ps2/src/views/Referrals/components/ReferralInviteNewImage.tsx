import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { ReactComponent as InviteTemplate } from '../../../images/invite-template.svg';
import { useCurrentUser } from '../../../apis/user/use';
import { hardcodedInviteeReward } from '../constants';

// svg controls
const qrCodeWidth = 125;
const imageHeight = 745;
const imageWidth = 575;
const qrCodePadding = 10;
const sidePadding = 53;
const qrCodeBorderRadius = 10;

const ReferralInviteNewImage: React.FC<{
  width?: number;
  mode: 'trader' | 'friend';
  url: string;
}> = ({ width, mode, url }) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const { refCode } = useCurrentUser();

  return (
    <svg
      width={width || imageWidth}
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
    >
      <defs>
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

      <InviteTemplate x={0} y={0} height={imageHeight} width={imageWidth} />

      <foreignObject
        x={sidePadding}
        y={130}
        width={imageWidth - 3 * sidePadding}
        height={100}
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            fontFamily: "'Avenir Next', arial, sans-serif",
            lineHeight: 1.4,
            fontSize: 38,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          <Trans
            i18nKey={'create-invite.ugly-' + mode + '-cta'}
            t={t}
            values={{
              depositAmount: hardcodedInviteeReward.threshold,
              reward: hardcodedInviteeReward.value,
            }}
          >
            <span style={{ color: '#ACB6FF' }} />
          </Trans>
        </div>
      </foreignObject>

      <foreignObject
        x={sidePadding}
        y={255}
        width={imageWidth - 3 * sidePadding}
        height={175}
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            fontFamily: "'Avenir Next', arial, sans-serif",
            lineHeight: 1.4,
            fontSize: 30,
            color: '#fff',
          }}
        >
          <Trans
            i18nKey={'create-invite.deposit-cta'}
            t={t}
            values={{
              depositAmount: hardcodedInviteeReward.threshold,
            }}
          >
            <span style={{ fontWeight: 700 }} />
            <span style={{ fontWeight: 700 }} />
          </Trans>
        </div>
      </foreignObject>

      <foreignObject
        x={sidePadding}
        y={600}
        width={imageWidth - 2 * sidePadding - 2 * qrCodePadding - qrCodeWidth}
        height={100}
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            fontFamily: "'Avenir Next', arial, sans-serif",
            lineHeight: 1.4,
            fontSize: 25,
            color: '#191940',
          }}
        >
          <div>
            <Trans i18nKey={'create-invite.scan-join'} t={t}>
              <span style={{ fontWeight: 700 }} />
            </Trans>

            <br />

            <Trans
              i18nKey={'create-invite.invite-code'}
              t={t}
              values={{
                code: refCode,
              }}
            >
              <span style={{ fontWeight: 700 }} />
            </Trans>
          </div>
        </div>
      </foreignObject>

      <g>
        <rect
          rx={qrCodeBorderRadius}
          ry={qrCodeBorderRadius}
          x={imageWidth - qrCodeWidth - 2 * qrCodePadding - sidePadding}
          y={580}
          width={qrCodeWidth + 2 * qrCodePadding}
          height={qrCodeWidth + 2 * qrCodePadding}
          fill={'#fff'}
        />
        <QRCodeSVG
          y={580 + qrCodePadding}
          x={imageWidth - qrCodeWidth - qrCodePadding - sidePadding}
          height={qrCodeWidth}
          size={qrCodeWidth}
          value={url}
        />
      </g>
    </svg>
  );
};

export default ReferralInviteNewImage;
