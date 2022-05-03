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
  describe('getEmployeesEligibleToWorkSundays', () => {
    let employees, employeesOver18, employeesUnder18, result;

    beforeEach(() => {
      employeesUnder18 = chance.n(() => {
        return randomEmployee({ age: chance.natural({ max: 17 }) });
      }, chance.d6());
      employeesOver18 = chance.n(() => {
        return randomEmployee({ age: chance.natural({ min: 18 }) });
      }, chance.d6());
      employees = chance.shuffle([...employeesUnder18, ...employeesOver18]);
    });

    beforeEach(() => {
      result = getEmployeesEligibleToWorkSundays(employees);
    });
    test('should return a list of employees older than 18', () => {
      expect(result.length).toStrictEqual(employeesOver18.length);
      expect(result).toStrictEqual(expect.arrayContaining(employeesOver18));
    });

    test('should not return employees under age 18', () => {
      expect(result).not.toContainEqual(employeesUnder18);
    });

    test('should return results from getEmployeesOver18', () => {
      expect(result).toStrictEqual(expect.arrayContaining(employeesOver18));
    });

    test('should return employees sorted by name', () => {
      const sortedEmployeesOver18 = employeesOver18.reduce(
        (acc, employee) => [
          ...acc.filter(({ name }) => name <= employee.name),
          employee,
          ...acc.filter(({ name }) => name > employee.name),
        ],
        []
      );

      expect(result).toStrictEqual(sortedEmployeesOver18);
    });
  });
});
