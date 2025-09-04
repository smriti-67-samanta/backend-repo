const express = require('express');
const fs = require('fs');
const roleCheckMiddleware = require('./middlewares/roleCheckMiddleware');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(loggerMiddleware);


function readEmployees() {
  try {
    const data = fs.readFileSync('employees.json', 'utf8');
    return JSON.parse(data).employees;
  } catch (error) {
    return [];
  }
}


function writeEmployees(employees) {
  try {
    const data = JSON.stringify({ employees }, null, 2);
    fs.writeFileSync('employees.json', data);
  } catch (error) {
    console.log('Error writing file:', error);
  }
}


app.get('/employees', roleCheckMiddleware(['admin', 'hr']), (req, res) => {
  try {
    const employees = readEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/employees', roleCheckMiddleware(['admin']), (req, res) => {
  try {
    const { name, position, department, salary, status } = req.body;
    
    if (!name || !position || !department || !salary) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const employees = readEmployees();
    const newEmployee = {
      id: employees.length + 1,
      name,
      position,
      department,
      salary: Number(salary),
      status: status || 'active'
    };
    
    employees.push(newEmployee);
    writeEmployees(employees);
    
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.put('/employees/:id', roleCheckMiddleware(['admin', 'hr']), (req, res) => {
  try {
    const employees = readEmployees();
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
    
    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    
    employees[employeeIndex] = {
      ...employees[employeeIndex],
      ...req.body,
      id: employeeId 
    };
    
    writeEmployees(employees);
    
    res.json(employees[employeeIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.delete('/employees/:id', roleCheckMiddleware(['admin']), (req, res) => {
  try {
    const employees = readEmployees();
    const employeeId = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
    
    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
   
    const deletedEmployee = employees.splice(employeeIndex, 1)[0];
    writeEmployees(employees);
    
    res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`👥 Employee Management running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /employees           - Get all employees (admin/hr)');
  console.log('   POST   /employees           - Add new employee (admin only)');
  console.log('   PUT    /employees/:id       - Update employee (admin/hr)');
  console.log('   DELETE /employees/:id       - Delete employee (admin only)');
  console.log('📝 Use header: x-role: admin or x-role: hr');
});