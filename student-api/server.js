const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


function readStudents() {
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).students;
  } catch (error) {
    console.log('Starting with empty students array');
    return [];
  }
}


function writeStudents(students) {
  try {
    const data = JSON.stringify({ students }, null, 2);
    fs.writeFileSync('db.json', data);
  } catch (error) {
    console.log('Error writing to file:', error);
  }
}


app.get('/students', (req, res) => {
  try {
    const students = readStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/students/:id', (req, res) => {
  try {
    const students = readStudents();
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/students', (req, res) => {
  try {
    const students = readStudents();
    const newStudent = {
      id: students.length + 1,
      name: req.body.name,
      course: req.body.course,
      batch: req.body.batch
    };
    
    students.push(newStudent);
    writeStudents(students);
    
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`🎓 Student API running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /students        - Get all students');
  console.log('   GET    /students/:id    - Get student by ID');
  console.log('   POST   /students        - Add new student');
  console.log('   *                      - 404 for other routes');
});