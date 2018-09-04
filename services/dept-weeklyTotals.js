const calcPercent = require('./percent-calc');

const getWeeklyTotals = (results, dates) => {

  const getCompanyTotal = results.reduce(
    (total, deptTotal) => total + deptTotal.deptTotalResources,
    0,
  );

  const response = {};

  for (let i = 0; i < dates.length; i++) {
    const weeklySum = results.reduce(
      (total, item) => total + item.chargeability[dates[i]].resourceCount,
      0,
    );
    response[dates[i]] = calcPercent(weeklySum, getCompanyTotal);
  }
  return response;
};

module.exports = getWeeklyTotals;
