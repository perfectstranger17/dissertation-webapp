export const calculateMainHeatCost = (
  value,
  mainHeatPrices,
  totalAreaFilter
) => {
  if (value) {
    switch (value) {
      case 'Very Poor':
        return totalAreaFilter === '0-50'
          ? mainHeatPrices.very_poor_0
          : totalAreaFilter === '50-100'
          ? mainHeatPrices.very_poor_1
          : totalAreaFilter === '100+'
          ? mainHeatPrices.very_poor_2
          : null;
        break;
      case 'Poor':
        return totalAreaFilter === '0-50'
          ? mainHeatPrices.poor_0
          : totalAreaFilter === '50-100'
          ? mainHeatPrices.poor_1
          : totalAreaFilter === '100+'
          ? mainHeatPrices.poor_2
          : null;
        break;
      case 'Average':
        return totalAreaFilter === '0-50'
          ? mainHeatPrices.average_0
          : totalAreaFilter === '50-100'
          ? mainHeatPrices.average_1
          : totalAreaFilter === '100+'
          ? mainHeatPrices.average_2
          : null;
        break;
      case 'Good':
        return totalAreaFilter === '0-50'
          ? mainHeatPrices.good_0
          : totalAreaFilter === '50-100'
          ? mainHeatPrices.good_1
          : totalAreaFilter === '100+'
          ? mainHeatPrices.good_2
          : null;
        break;

      case 'Very Good':
        return totalAreaFilter === '0-50'
          ? mainHeatPrices.very_good_0
          : totalAreaFilter === '50-100'
          ? mainHeatPrices.very_good_1
          : totalAreaFilter === '100+'
          ? mainHeatPrices.very_good_2
          : null;
        break;

      default:
        return;
        break;
    }
  }
};

export const calculateMainHeatingUniversal = (
  avgCurrent,
  avgUpgraded,
  currentMainHeat,
  upgradedMainHeat
) => {
  let value = 0;

  let rate_poor = 0.43;
  let rate_avg = 0.21;
  let rate_good = 0.2;
  let rate_very_good = 0.16;

  if (avgCurrent < avgUpgraded) {
    //
    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Poor') {
      value = avgCurrent - avgCurrent * rate_poor;
    }

    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Average') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg);
    }

    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Good') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg + rate_good);
    }

    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Very Good') {
      value =
        avgCurrent -
        avgCurrent * (rate_poor + rate_avg + rate_good + rate_very_good);
    }
    //
    if (currentMainHeat === 'Poor' && upgradedMainHeat === 'Average') {
      value = avgCurrent - avgCurrent * rate_avg;
    }

    if (currentMainHeat === 'Poor' && upgradedMainHeat === 'Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good);
    }

    if (currentMainHeat === 'Poor' && upgradedMainHeat === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good + rate_very_good);
    }

    //
    if (currentMainHeat === 'Average' && upgradedMainHeat === 'Good') {
      value = avgCurrent - avgCurrent * rate_good;
    }

    if (currentMainHeat === 'Average' && upgradedMainHeat === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_good + rate_very_good);
    }

    //
    if (currentMainHeat === 'Good' && upgradedMainHeat === 'Very Good') {
      value = avgCurrent - avgCurrent * rate_very_good;
    }
  } else {
    value = avgUpgraded;
  }
  return value;
};

export const calculateMainHeatingHotWaterUniversal = (
  avgCurrent,
  avgUpgraded,
  currentMainHeat,
  upgradedMainHeat
) => {
  let value = 0;

  let rate_poor = 0.38;
  let rate_avg = 0.23;
  let rate_good = 0.29;
  let rate_very_good = 0.36;

  if (avgCurrent < avgUpgraded) {
    //
    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Poor') {
      value = avgCurrent - avgCurrent * rate_poor;
    }

    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Average') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg);
    }

    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Good') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg + rate_good);
    }

    if (currentMainHeat === 'Very Poor' && upgradedMainHeat === 'Very Good') {
      value =
        avgCurrent -
        avgCurrent * (rate_poor + rate_avg + rate_good + rate_very_good);
    }
    //
    if (currentMainHeat === 'Poor' && upgradedMainHeat === 'Average') {
      value = avgCurrent - avgCurrent * rate_avg;
    }

    if (currentMainHeat === 'Poor' && upgradedMainHeat === 'Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good);
    }

    if (currentMainHeat === 'Poor' && upgradedMainHeat === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good + rate_very_good);
    }

    //
    if (currentMainHeat === 'Average' && upgradedMainHeat === 'Good') {
      value = avgCurrent - avgCurrent * rate_good;
    }

    if (currentMainHeat === 'Average' && upgradedMainHeat === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_good + rate_very_good);
    }

    //
    if (currentMainHeat === 'Good' && upgradedMainHeat === 'Very Good') {
      value = avgCurrent - avgCurrent * rate_very_good;
    }
  } else {
    value = avgUpgraded;
  }
  return value;
};

export const calculateMainHeatingROI = (savings, upgradeCost) => {
  console.log(savings, upgradeCost);
  return ((savings / upgradeCost) * 100).toFixed();
};

// export const calculateMainHeatingWaterROI = (savings, upgradeCost) => {
//   console.log(savings, upgradeCost);
//   return ((savings / upgradeCost) * 100).toFixed();
// };
