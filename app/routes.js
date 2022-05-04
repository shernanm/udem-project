const { healthCheck } = require('./controllers/healthCheck');
const {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deteleStudent
} = require('./controllers/student');
const {
  createcareer,
  getAllcareers,
  getcareer,
  getcareerAndStudents,
  updatecareer,
  detelecareer
} = require('./controllers/career');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/career', createcareer);
  app.get('/career', getAllcareers);
  app.get('/career/:id', getcareer);
  app.get('/career/students/:code', getcareerAndStudents);
  app.put('/career/:id', updatecareer);
  app.delete('/career/:id', detelecareer);
  app.post('/student', createStudent);
  app.get('/student', getAllStudents);
  app.get('/student/:id', getStudent);
  app.put('/student/:id', updateStudent);
  app.delete('/student/:id', deteleStudent);
};
