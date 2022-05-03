const SORT_DIRECTION = {
    ASCENDING: Symbol('ASCENDING'),
    DESCENDING: Symbol('DESCENDING'),
};

const getEmployeesOver18 = (employees) => employees.filter((employee) => employee.age >= 18);

const sortEmployees = (employees, sortDirection = SORT_DIRECTION.DESCENDING) => {
    return sortDirection === SORT_DIRECTION.ASCENDING
        ? [...employees].sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
          })
        : [...employees].sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
          });
};

const capitalize = (word) => word.toUpperCase();

const getCapitalizedSortedEmployeesOver18 = (employees, isAscending) => {
    return sortEmployees(getEmployeesOver18(employees), isAscending).map((employee) => ({
        ...employee,
        name: capitalize(employee.name),
    }));
};

export {getCapitalizedSortedEmployeesOver18, SORT_DIRECTION};
