const getEmployeesOver18 = (employees) =>
  employees.filter((employee) => employee.age >= 18);

const getEmployeesEligibleToWorkSundays = (employees) =>
  getEmployeesOver18(employees);

export { getEmployeesOver18, getEmployeesEligibleToWorkSundays };
