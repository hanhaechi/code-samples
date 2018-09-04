const percent = require('../percent-calc');

describe('percent calculations', () => {
    it('should return percentage with two decimal points when two numbers are provided', () => {
        const resourcesPerProject = 5;
        const totalDeptResources = 20;
        const result = percent(resourcesPerProject,totalDeptResources);
        return expect(result).toEqual('25.00');
    });

    it('should return an error message if total number is <=0', () => {
        const resourcesPerProject = 5;
        const totalDeptResources = 0;
        const result = percent(resourcesPerProject,totalDeptResources);
        return expect(result).toContain('Error');
    });
})