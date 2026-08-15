const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err.message));

// show all students, plus the add form
app.get('/', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.render('index', { students, editingStudent: null });
});

// same page, but pre-filled for editing one student
app.get('/edit/:id', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  const editingStudent = await Student.findById(req.params.id);
  res.render('index', { students, editingStudent });
});

// create if no id, update if id is present
app.post('/save', async (req, res) => {
  const { id, name, rollNo, course, email, marks } = req.body;
  const data = {
    name,
    rollNo,
    course,
    email,
    marks: marks === '' ? undefined : marks
  };

  if (id) {
    await Student.findByIdAndUpdate(id, data);
  } else {
    await Student.create(data);
  }
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('---------------------------------------------');
  console.log(`  Server running at: http://localhost:${PORT}`);
  console.log('---------------------------------------------');
});
