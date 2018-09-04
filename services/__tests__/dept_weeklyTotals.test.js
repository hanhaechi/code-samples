const totals = require('../dept-weeklyTotals');

const test1 = [
  {
    deptName: 'Web',
    deptTotalResources: 30,
    chargeability: {
      '2018-08-27': {
        resourceCount: 0,
        percent: '32.61',
      },
      '2018-09-03': {
        resourceCount: 15,
        percent: '32.61',
      },
      '2018-09-10': {
        resourceCount: 10,
        percent: '32.61',
      },
    },
  },
  {
    deptName: 'Product',
    deptTotalResources: 20,
    chargeability: {
      '2018-08-27': {
        resourceCount: 5,
        percent: '50.00',
      },
      '2018-09-03': {
        resourceCount: 15,
        percent: '50.00',
      },
      '2018-09-10': {
        resourceCount: 0,
        percent: '50.00',
      },
    },
  },
];

const test2 = [
  {
    deptName: 'Product',
    deptTotalResources: 0,
    chargeability: {
      '2018-08-27': {
        resourceCount: 5,
        percent: '50.00',
      },
      '2018-09-03': {
        resourceCount: 15,
        percent: '50.00',
      },
      '2018-09-10': {
        resourceCount: 0,
        percent: '50.00',
      },
    },
  },
  {
    deptName: 'Hogvarts',
    deptTotalResources: 0,
    chargeability: {
      '2018-08-27': {
        resourceCount: 5,
        percent: 'Error: a number lower than 1 was passed in as total number',
      },
      '2018-09-03': {
        resourceCount: 0,
        percent: 'Error: a number lower than 1 was passed in as total number',
      },
      '2018-09-10': {
        resourceCount: 0,
        percent: 'Error: a number lower than 1 was passed in as total number',
      },
    },
  },
];

const dates = ['2018-08-27', '2018-09-03', '2018-09-10'];

describe('calculation of weekly totals', () => {
  it('should return correct percentages for the dates passed in when total dept resources are more than 0', () => {
    const result = totals(test1, dates);
    expect(result['2018-08-27']).toEqual('10.00');
    expect(result['2018-09-03']).toEqual('60.00');
    return expect(result['2018-09-10']).toEqual('20.00');
  });

  it('should return an error if department totals add up to a 0', () => {
    const result = totals(test2, dates);
    expect(result['2018-08-27']).toContain('Error');
  });
});
