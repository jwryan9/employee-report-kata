import { Chance } from 'chance';
import {
  getEmployeesOver18,
  getEmployeesEligibleToWorkSundays,
} from '../src/employee-report';

const chance = new Chance();

const randomEmployee = (employee) => ({
  name: chance.name(),
  age: chance.natural({ max: 100 }),
  ...employee,
});

describe('employee-report', () => {
  let employees, employeesOver18, employeesUnder18;

  beforeEach(() => {
    employeesUnder18 = chance.n(() => {
      return randomEmployee({ age: chance.natural({ max: 17 }) });
    }, chance.d100());
    employeesOver18 = chance.n(() => {
      return randomEmployee({ age: chance.natural({ min: 18 }) });
    }, chance.d100());
    employees = chance.shuffle([...employeesUnder18, ...employeesOver18]);
  });

  describe('getEmployeesOver18', () => {
    let result;

    beforeEach(() => {
      result = getEmployeesOver18(employees);
    });

    test('should return a list of employees older than 18', () => {
      expect(result.length).toStrictEqual(employeesOver18.length);
      expect(result).toStrictEqual(expect.arrayContaining(employeesOver18));
    });

    test('should not return employees under age 18', () => {
      expect(result).not.toContainEqual(employeesUnder18);
    });
  });

  describe('getEmployeesEligibleToWorkSundays', () => {
    let result;

    beforeEach(() => {
      result = getEmployeesEligibleToWorkSundays(employees);
    });

    test('should return results from getEmployeesOver18', () => {
      expect(result).toStrictEqual(expect.arrayContaining(employeesOver18));
    });
  });
});
