const employeeService = require('./services/employeeService');

module.exports = app => {
	app.route('/api/employees').get(employeeService.getAllEmployees);

	app.route('/api/employee').post(employeeService.addEmployee);

	app
		.route('/api/employee/:id')
		.get(employeeService.getEmployeeById)
		.put(employeeService.editEmployee)
		.delete(employeeService.deleteEmployee);
};
