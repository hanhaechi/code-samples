const calcPercent = require('./percent-calc');

const calculateChargeability = (resourcesAll, mondays, totalResources) => {
  let result = {};
  mondays.forEach((key, i) => {
    result[key] = {
      resourceCount: 0,
      percent: 0,
    };

    for (let i = 0; i < resourcesAll.length; i++) {
      if (
        key >= resourcesAll[i].dataValues.start_date &&
        key <= resourcesAll[i].dataValues.end_date
      ) {
        result[key].resourceCount +=
          resourcesAll[i].dataValues.resource_count;
      }
    }
    result[key].percent = calcPercent(
      result[key].resourceCount,
      totalResources,
    );
  });
  return result;
};

module.exports = calculateChargeability;
