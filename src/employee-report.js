const getEmployeesOver18 = (employees) =>
  employees.filter((employee) => employee.age >= 18);

const sortEmployees = (employees) => {
  return [...employees].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};

const getSortedEmployeesOver18 = (employees) => {
  const employeesOver18 = getEmployeesOver18(employees);
  return sortEmployees(employeesOver18);
};

const getEmployeesEligibleToWorkSundays = (employees) =>
  getSortedEmployeesOver18(employees);

export { getEmployeesOver18, getEmployeesEligibleToWorkSundays };
