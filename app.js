//import
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Student = require('./models/user.js');

const port = 5600;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

//database connection
mongoose.connect('mongodb://localhost:27017/student_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.get('/', async(req, res) =>{

  const student = await Student.find()
  res.render('index', {student})
})

app.post('/add', async (req, res) =>{
  const {rollNo, name, college, department, city} = req.body
  const student = new Student({rollNo, name, college, department, city})
  await student.save()
  res.redirect('/')
})

//edit student details
app.get('/edit/:id',async (req, res) =>{
  let id = req.params.id
  const student = await Student.findById(id)
  res.render('edit', {student})
})

//update student details
app.post('/update/:id', async (req, res) =>{
  const id = req.params.id;
  const { rollNo, name, college, department, city } = req.body;
  await Student.findByIdAndUpdate(id, { rollNo, name, college, department, city });
  res.redirect('/');
});


//delete student details
app.get('/delete/:id', async (req, res) =>{
  const id = req.params.id;
  await Student.findByIdAndDelete(id);
  res.redirect('/');
});

//port link
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})