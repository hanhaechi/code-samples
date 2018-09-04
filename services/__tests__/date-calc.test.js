const date = require('../date-calc');

describe('date calculations', () => {
  it('should return Monday of the week, Sunday of the last week and an array of Mondays in between when dates are provided', () => {
    const requestBody = {
      startDate: '2018-07-05'
    };
    const result = date.getStartEndDates(requestBody);
    return expect(result).toEqual({
      startDate: '2018-07-02',
      endDate: '2018-08-26',
      weeks: 7,
      mondays: ["2018-07-02", "2018-07-09", "2018-07-16", "2018-07-23", "2018-07-30", "2018-08-06", "2018-08-13", "2018-08-20"],
    });
  });

  it('should return Monday of THE CURRENT week, Sunday 8 weeks ahead and an array of Mondays in between if no date provided in requestBody', () => {
    const requestBody = {};
    const result = date.getStartEndDates(requestBody);
    expect(result.startDate).toHaveLength(10);
    expect(result.endDate).toHaveLength(10);
    expect(result.mondays).toHaveLength(8);
    return expect(result.weeks).toEqual(7);
  });

  it('should return Monday of THIS week, Sunday 8 weeks ahead and array of Mondays in between if anything else but a date is provided as start/end date', () => {
    const requestBody = {
      startDate: 'whatever',
      endDate: 16,
    };
    const result = date.getStartEndDates(requestBody);
    expect(result.startDate).toHaveLength(10);
    expect(result.endDate).toHaveLength(10);
    expect(result.mondays).toHaveLength(8);
    return expect(result.weeks).toEqual(7);
  });
});
