import {Chance} from 'chance';
import {getEmployeesOver18, getEmployeesEligibleToWorkSundays} from '../src/employee-report';

const chance = new Chance();

const randomEmployee = (employee) => ({
    name: chance.name(),
    age: chance.natural({max: 100}),
    ...employee,
});

describe('employee-report', () => {
    describe('getEmployeesEligibleToWorkSundays', () => {
        let employees, capitalizedEmployeesOver18, result;

        beforeEach(() => {
            const employeesUnder18 = chance.n(() => {
                return randomEmployee({age: chance.natural({max: 17})});
            }, chance.d6());
            const employeesOver18 = chance.n(() => {
                return randomEmployee({age: chance.natural({min: 18})});
            }, chance.d6());
            employees = chance.shuffle([...employeesUnder18, ...employeesOver18]);

            capitalizedEmployeesOver18 = employeesOver18.map((employee) => ({
                ...employee,
                name: employee.name.toUpperCase(),
            }));
        });

        beforeEach(() => {
            result = getEmployeesEligibleToWorkSundays(employees);
        });

        test('should return a list of employees older than 18', () => {
            expect(result.length).toStrictEqual(capitalizedEmployeesOver18.length);
            expect(result).toStrictEqual(expect.arrayContaining(capitalizedEmployeesOver18));
        });

        test('should not return employees under age 18', () => {
            result.forEach((employee) => {
                expect(employee.age).toBeGreaterThan(18);
            });
        });

        test('should return employees capitalized and sorted alphabetically by name', () => {
            const sortedCapitalizedEmployeesOver18 = capitalizedEmployeesOver18.reduce(
                (acc, employee) => [
                    ...acc.filter(({name}) => name <= employee.name),
                    employee,
                    ...acc.filter(({name}) => name > employee.name),
                ],
                []
            );

            expect(result).toStrictEqual(sortedCapitalizedEmployeesOver18);
        });
    });
});
