import { groupBy } from 'lodash';

export const calculateWindowsCost = (
  value,
  numWindows,
  windowsPrices,
  totalAreaFilter
) => {
  if (value) {
    switch (totalAreaFilter) {
      case '0-50':
        return value === 'Very Poor'
          ? windowsPrices.very_poor * numWindows.windowsSmall
          : value === 'Poor'
          ? windowsPrices.poor * numWindows.windowsSmall
          : value === 'Average'
          ? windowsPrices.average * numWindows.windowsSmall
          : value === 'Good'
          ? windowsPrices.good * numWindows.windowsSmall
          : value === 'Very Good'
          ? windowsPrices.very_good * numWindows.windowsSmall
          : null;

        break;
      case '50-100':
        return value === 'Very Poor'
          ? windowsPrices.very_poor * numWindows.windowsAvg
          : value === 'Poor'
          ? windowsPrices.poor * numWindows.windowsAvg
          : value === 'Average'
          ? windowsPrices.average * numWindows.windowsAvg
          : value === 'Good'
          ? windowsPrices.good * numWindows.windowsAvg
          : value === 'Very Good'
          ? windowsPrices.very_good * numWindows.windowsAvg
          : null;

        break;
      case '100+':
        return value === 'Very Poor'
          ? windowsPrices.very_poor * numWindows.windowsBig
          : value === 'Poor'
          ? windowsPrices.poor * numWindows.windowsBig
          : value === 'Average'
          ? windowsPrices.average * numWindows.windowsBig
          : value === 'Good'
          ? windowsPrices.good * numWindows.windowsBig
          : value === 'Very Good'
          ? windowsPrices.very_good * numWindows.windowsBig
          : null;

        break;

      default:
        return;
        break;
    }
  }
};

export const calculateWindowsUniversal = (
  avgCurrent,
  avgUpgraded,
  currentWindows,
  upgradedWindows
) => {
  let value = 0;

  let rate_poor = 0.11;
  let rate_avg = 0.21;
  let rate_good = 0.15;
  let rate_very_good = 0.06;

  if (avgCurrent < avgUpgraded) {
    //
    if (currentWindows === 'Very Poor' && upgradedWindows === 'Poor') {
      value = avgCurrent - avgCurrent * rate_poor;
    }

    if (currentWindows === 'Very Poor' && upgradedWindows === 'Average') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg);
    }

    if (currentWindows === 'Very Poor' && upgradedWindows === 'Good') {
      value = avgCurrent - avgCurrent * (rate_poor + rate_avg + rate_good);
    }

    if (currentWindows === 'Very Poor' && upgradedWindows === 'Very Good') {
      value =
        avgCurrent -
        avgCurrent * (rate_poor + rate_avg + rate_good + rate_very_good);
    }
    //
    if (currentWindows === 'Poor' && upgradedWindows === 'Average') {
      value = avgCurrent - avgCurrent * rate_avg;
    }

    if (currentWindows === 'Poor' && upgradedWindows === 'Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good);
    }

    if (currentWindows === 'Poor' && upgradedWindows === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_avg + rate_good + rate_very_good);
    }

    //
    if (currentWindows === 'Average' && upgradedWindows === 'Good') {
      value = avgCurrent - avgCurrent * rate_good;
    }

    if (currentWindows === 'Average' && upgradedWindows === 'Very Good') {
      value = avgCurrent - avgCurrent * (rate_good + rate_very_good);
    }

    //
    if (currentWindows === 'Good' && upgradedWindows === 'Very Good') {
      value = avgCurrent - avgCurrent * rate_very_good;
    }
  } else {
    value = avgUpgraded;
  }
  return value;
};

export const calculateWindowsROI = (savings, upgradeCost) => {
  console.log(savings, upgradeCost);
  return ((savings / upgradeCost) * 100).toFixed();
};
