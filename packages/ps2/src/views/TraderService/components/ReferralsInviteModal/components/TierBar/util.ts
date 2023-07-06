import { getBoostedCommissionPct } from '../../util';

export const calculateLayerValue = (
  layer: number,
  tierCommission: number,
  boost: number,
  serviceCommission: number,
) => {
  if (layer === 3) {
    // Only used to show the base commission when there is a boost and service commission
    return boost > 1 && serviceCommission > 0 ? tierCommission : 0;
  } else if (layer === 2) {
    // Don't apply boost here if there is no service commission, since it will be applied in layer 1
    return getBoostedCommissionPct(
      tierCommission,
      serviceCommission > 0 ? boost : 1,
    );
  } else {
    // layer 1 = max value
    return getBoostedCommissionPct(tierCommission, boost, serviceCommission);
  }
};
