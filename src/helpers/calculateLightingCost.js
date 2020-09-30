export const calculateLightingCost = (
  value,
  numOutlets,
  lightingPrices,
  totalAreaFilter
) => {
  if (value) {
    switch (totalAreaFilter) {
      case '0-50':
        return value === 'Very Poor'
          ? lightingPrices.very_poor * numOutlets.small
          : value === 'Poor'
          ? lightingPrices.poor * numOutlets.small
          : value === 'Average'
          ? lightingPrices.average * numOutlets.small
          : value === 'Good'
          ? lightingPrices.good * numOutlets.small
          : value === 'Very Good'
          ? lightingPrices.very_good * numOutlets.small
          : null;

        break;
      case '50-100':
        return value === 'Very Poor'
          ? lightingPrices.very_poor * numOutlets.avg
          : value === 'Poor'
          ? lightingPrices.poor * numOutlets.avg
          : value === 'Average'
          ? lightingPrices.average * numOutlets.avg
          : value === 'Good'
          ? lightingPrices.good * numOutlets.avg
          : value === 'Very Good'
          ? lightingPrices.very_good * numOutlets.avg
          : null;

        break;
      case '100+':
        return value === 'Very Poor'
          ? lightingPrices.very_poor * numOutlets.big
          : value === 'Poor'
          ? lightingPrices.poor * numOutlets.big
          : value === 'Average'
          ? lightingPrices.average * numOutlets.big
          : value === 'Good'
          ? lightingPrices.good * numOutlets.big
          : value === 'Very Good'
          ? lightingPrices.very_good * numOutlets.big
          : null;

        break;

      default:
        return;
        break;
    }
  }
};

export const calculateLightingUniversal = (
  avgCurrent,
  avgUpgraded,
  currentLighting,
  upgradedLighting
) => {
  let value = 0;

  let rate_poor = 0.17;
  let rate_avg = 0.18;
  let rate_good = 0.29;
  let rate_very_good = 0.1;

  if (avgCurrent < avgUpgraded) {
    //
    if (currentLighting === 'Very Poor' && upgradedLighting === 'Poor') {
      value = avgCurrent - avgCurrent * rate_poor;
    }

    if (currentLighting === 'Very Poor' && upgradedLighting === 'Average') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg);
    }

    if (currentLighting === 'Very Poor' && upgradedLighting === 'Good') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg + rate_good);
    }

    if (currentLighting === 'Very Poor' && upgradedLighting === 'Very Good') {
      value =
        avgCurrent -
        avgCurrent * (rate_poor + rate_avg + rate_good + rate_very_good);
    }
    //
    if (currentLighting === 'Poor' && upgradedLighting === 'Average') {
      value = avgCurrent - avgCurrent * rate_avg;
    }

    if (currentLighting === 'Poor' && upgradedLighting === 'Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good);
    }

    if (currentLighting === 'Poor' && upgradedLighting === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good + rate_very_good);
    }

    //
    if (currentLighting === 'Average' && upgradedLighting === 'Good') {
      value = avgCurrent - avgCurrent * rate_good;
    }

    if (currentLighting === 'Average' && upgradedLighting === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_good + rate_very_good);
    }

    //
    if (currentLighting === 'Good' && upgradedLighting === 'Very Good') {
      value = avgCurrent - avgCurrent * rate_very_good;
    }
  } else {
    value = avgUpgraded;
  }
  return value;
};

export const calculateLightingROI = (savings, upgradeCost) => {
  console.log(savings, upgradeCost);
  return ((savings / upgradeCost) * 100).toFixed();
};
