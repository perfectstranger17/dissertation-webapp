export const calculateWallsCost = (value, wallPrices, totalAreaFilter) => {
  if (value) {
    switch (value) {
      case 'Very Poor':
        return totalAreaFilter === '0-50'
          ? wallPrices.very_poor_0
          : totalAreaFilter === '50-100'
          ? wallPrices.very_poor_1
          : totalAreaFilter === '100+'
          ? wallPrices.very_poor_2
          : null;
        break;
      case 'Poor':
        return totalAreaFilter === '0-50'
          ? wallPrices.poor_0
          : totalAreaFilter === '50-100'
          ? wallPrices.poor_1
          : totalAreaFilter === '100+'
          ? wallPrices.poor_2
          : null;
        break;
      case 'Average':
        return totalAreaFilter === '0-50'
          ? wallPrices.average_0
          : totalAreaFilter === '50-100'
          ? wallPrices.average_1
          : totalAreaFilter === '100+'
          ? wallPrices.average_2
          : null;
        break;
      case 'Good':
        return totalAreaFilter === '0-50'
          ? wallPrices.good_0
          : totalAreaFilter === '50-100'
          ? wallPrices.good_1
          : totalAreaFilter === '100+'
          ? wallPrices.good_2
          : null;
        break;

      case 'Very Good':
        return totalAreaFilter === '0-50'
          ? wallPrices.very_good_0
          : totalAreaFilter === '50-100'
          ? wallPrices.very_good_1
          : totalAreaFilter === '100+'
          ? wallPrices.very_good_2
          : null;
        break;

      default:
        return;
        break;
    }
  }
};

export const calculateWallsUniversal = (
  avgCurrent,
  avgUpgraded,
  currentWalls,
  upgradedWalls
) => {
  let value = 0;

  let rate_poor = 0.17;
  let rate_avg = 0.18;
  let rate_good = 0.29;
  let rate_very_good = 0.1;

  if (avgCurrent < avgUpgraded) {
    //
    if (currentWalls === 'Very Poor' && upgradedWalls === 'Poor') {
      value = avgCurrent - avgCurrent * rate_poor;
    }

    if (currentWalls === 'Very Poor' && upgradedWalls === 'Average') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg);
    }

    if (currentWalls === 'Very Poor' && upgradedWalls === 'Good') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg + rate_good);
    }

    if (currentWalls === 'Very Poor' && upgradedWalls === 'Very Good') {
      value =
        avgCurrent -
        avgCurrent * (rate_poor + rate_avg + rate_good + rate_very_good);
    }
    //
    if (currentWalls === 'Poor' && upgradedWalls === 'Average') {
      value = avgCurrent - avgCurrent * rate_avg;
    }

    if (currentWalls === 'Poor' && upgradedWalls === 'Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good);
    }

    if (currentWalls === 'Poor' && upgradedWalls === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good + rate_very_good);
    }

    //
    if (currentWalls === 'Average' && upgradedWalls === 'Good') {
      value = avgCurrent - avgCurrent * rate_good;
    }

    if (currentWalls === 'Average' && upgradedWalls === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_good + rate_very_good);
    }

    //
    if (currentWalls === 'Good' && upgradedWalls === 'Very Good') {
      value = avgCurrent - avgCurrent * rate_very_good;
    }
  } else {
    value = avgUpgraded;
  }
  return value;
};

export const calculateWallsROI = (savings, upgradeCost) => {
  console.log(savings, upgradeCost);
  return ((savings / upgradeCost) * 100).toFixed();
};
