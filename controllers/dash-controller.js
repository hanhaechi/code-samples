const models = require('../models');
const serializers = require('../serializers');
const date = require('../services/date-calc');
const getMatchingResources = require('../services/dept-chargeability');
const getWeeklyTotals = require('../services/dept-weeklyTotals');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const index = async (req, res) => {
  try {
    let dates = date.getStartEndDates(req.query);
    let departments = null;

    switch (req.query.show) {
      case 'projects':
        departments = await models.department.all({
          include: [
            {
              model: models.resource,
              attributes: [
                'department_id',
                'start_date',
                'end_date',
                'resource_count',
              ],
              where: {
                start_date: {
                  [Op.lte]: dates.endDate, // where resource start date is <= query.endDate
                },
                end_date: {
                  [Op.gte]: dates.startDate, // where resource end date is >= query.startDate
                },
              },
              include: [
                {
                  model: models.project,
                  attributes: ['became_project', 'name'],
                  where: {
                    became_project: {
                      [Op.ne]: null,
                    },
                  },
                },
              ],
            },
          ],
        });
        break;
      case 'opportunities':
        departments = await models.department.all({
          include: [
            {
              model: models.resource,
              attributes: [
                'department_id',
                'start_date',
                'end_date',
                'resource_count',
              ],
              where: {
                start_date: {
                  [Op.lte]: dates.endDate,
                },
                end_date: {
                  [Op.gte]: dates.startDate, 
                },
              },
              include: [
                {
                  model: models.project,
                  attributes: ['became_project', 'name'],
                  where: {
                    became_project: null,
                  },
                },
              ],
            },
          ],
        });
        break;
      default:
        departments = await models.department.all({
          include: [
            {
              model: models.resource,
              attributes: [
                'department_id',
                'start_date',
                'end_date',
                'resource_count',
              ],
              where: {
                start_date: {
                  [Op.lte]: dates.endDate, 
                },
                end_date: {
                  [Op.gte]: dates.startDate,
                },
              },
              include: [
                {
                  model: models.project,
                  attributes: ['became_project', 'name'],
                },
              ],
            },
          ],
        });
    }
    let response;
    if (departments.length > 0) {
      const resources = await getMatchingResources(departments, dates.mondays);
      const weeklyTotals = await getWeeklyTotals(resources, dates.mondays);
      response = await serializers.dashboard(resources, weeklyTotals);
    } else {
      response = await serializers.dashboard([], {});
    }
    return res.json(response);
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = {
  index,
};
