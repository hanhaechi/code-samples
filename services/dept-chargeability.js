const getCharg = require('./dept-resources');

const deptChargeability = async (departments, mondays) => {
  const response = await Promise.all(
    departments.map(async dept => {
      let resourcesAll = dept.dataValues.resources;
      let totalResources = dept.dataValues.totalResources;
      let chargeabilityFinal = getCharg(resourcesAll, mondays, totalResources);

      return {
        deptName: dept.dataValues.name,
        deptTotalResources: dept.dataValues.totalResources,
        chargeability: chargeabilityFinal,
      };
    }),
  );
  return response;
};

module.exports = deptChargeability;
