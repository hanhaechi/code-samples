const moment = require('moment');
moment().format();

const getStartEndDates = qParams => {
  let dates = {
    startDate: null,
    endDate: null,
    weeks: 7, // default case is show 8 weeks on dashboard, incl week of the start date
    mondays: null,
  };

  if (qParams.startDate && moment(qParams.startDate).isValid()) {
    dates.startDate = moment(qParams.startDate)
      .startOf('ISOweek')
      .format('YYYY-MM-DD'); // get Monday of start week
  } else {
    dates.startDate = moment()
      .startOf('ISOweek')
      .format('YYYY-MM-DD');
  }
  dates.endDate = getEndDate(dates.startDate, dates.weeks);
  dates.mondays = getArrOfMondays(dates.startDate, dates.weeks);
  return dates;
};

const getArrOfMondays = (firstMonday, numberOfMondays) => {
  let weeks = [firstMonday];
  let mondayIndex = 0;
  while (mondayIndex < numberOfMondays) {
    weeks.push(
      moment(weeks[mondayIndex])
        .add(7, 'days')
        .format('YYYY-MM-DD'),
    );
    mondayIndex++;
  }
  return weeks;
};

const getEndDate = (startDate, weeks) => {
  let startWeek = moment(startDate).week();
  let endWeek = moment(startDate).weeks(startWeek + weeks);
  return moment(endWeek)
    .endOf('ISOweek')
    .format('YYYY-MM-DD');
};

module.exports = {
  getStartEndDates,
};
