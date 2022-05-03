import {Chance} from 'chance';

import {getCapitalizedSortedEmployeesOver18, SORT_DIRECTION} from '../src/employee-report';

const chance = new Chance();

const randomEmployee = (employee) => ({
    age: chance.natural({max: 100}),
    name: chance.name(),
    ...employee,
});

describe('employee-report', () => {
    describe('getCapitalizedSortedEmployeesOver18', () => {
        let employees, capitalizedEmployeesOver18, result;

        beforeEach(() => {
            const employeesUnder18 = chance.n(() => randomEmployee({age: chance.natural({max: 17})}), chance.d100());
            const employeesOver18 = chance.n(() => randomEmployee({age: chance.natural({min: 18})}), chance.d100());

            employees = chance.shuffle([...employeesUnder18, ...employeesOver18]);

            capitalizedEmployeesOver18 = employeesOver18.map((employee) => ({
                ...employee,
                name: employee.name.toUpperCase(),
            }));
        });

        describe('always', () => {
            beforeEach(() => {
                result = getCapitalizedSortedEmployeesOver18(employees);
            });

            test('should return a capitalized list of employees older than 18', () => {
                expect(result).toHaveLength(capitalizedEmployeesOver18.length);
                expect(result).toStrictEqual(expect.arrayContaining(capitalizedEmployeesOver18));
            });

            test('should not return employees under age 18', () => {
                result.forEach((employee) => {
                    expect(employee.age).toBeGreaterThan(18);
                });
            });
        });

        describe('when user sorts descending', () => {
            beforeEach(() => {
                const isAscending = false;

                result = getCapitalizedSortedEmployeesOver18(employees, isAscending);
            });

            test('should return employees capitalized and sorted descending alphabetically by name', () => {
                const sortedCapitalizedEmployeesOver18 = capitalizedEmployeesOver18.reduce(
                    (acc, employee) => [
                        ...acc.filter(({name}) => name < employee.name),
                        employee,
                        ...acc.filter(({name}) => name >= employee.name),
                    ],
                    []
                );

                expect(result).toStrictEqual(sortedCapitalizedEmployeesOver18);
            });
        });

        describe('when user chooses to sort ascending', () => {
            beforeEach(() => {
                result = getCapitalizedSortedEmployeesOver18(employees, SORT_DIRECTION.ASCENDING);
            });

            test('should return employees capitalized and sorted ascending alphabetically by name', () => {
                const sortedCapitalizedEmployeesOver18 = capitalizedEmployeesOver18.reduce(
                    (acc, employee) => [
                        ...acc.filter(({name}) => name > employee.name),
                        employee,
                        ...acc.filter(({name}) => name <= employee.name),
                    ],
                    []
                );

                expect(result).toStrictEqual(sortedCapitalizedEmployeesOver18);
            });
        });
    });
});
