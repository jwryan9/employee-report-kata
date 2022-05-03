const getEmployeesOver18 = (employees) => employees.filter((employee) => employee.age >= 18);

const sortEmployees = (employees) => {
    return [...employees].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};

const capitalize = (word) => word.toUpperCase();

const getSortedEmployeesOver18 = (employees) => {
    return sortEmployees(getEmployeesOver18(employees)).map((employee) => ({
        ...employee,
        name: capitalize(employee.name),
    }));
};

const getEmployeesEligibleToWorkSundays = (employees) => getSortedEmployeesOver18(employees);

export {getEmployeesEligibleToWorkSundays};
