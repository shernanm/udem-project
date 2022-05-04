const studentSchema = require('../models/student');
const careerSchema = require('../models/career');

exports.createStudent = async (req, res) => {
  const student = req.body;
  const career = await careerSchema.find({ codigo: student.carrera });
  if (!career.length || !career[0].activo) return res.json({ message: 'La carrera elegida no existe' });
  if (!career[0].activo) return res.json({ message: 'La carrera no esta activa' });
  const studentFound = await studentSchema.find({ nro_identificacion: student.nro_identificacion });
  if (studentFound.length && studentFound[0].activo) {
    return res.status(400).json({ message: 'El estudiante ya se encuentra registrado' });
  } else if (studentFound.length && !studentFound[0].activo) {
    return studentSchema
      .updateOne({ nro_identificacion: student.nro_identificacion }, { $set: { ...student, activo: true } })
      .then(() =>
        res.status(201).send({
          message: `El estudiante que estaba inactivo ahora esta inscrito en la carrera con codigo: ${student.carrera}`
        })
      )
      .catch(err => res.json({ mesagge: err }));
  }
  const studentToCreate = studentSchema(student);
  return studentToCreate
    .save()
    .then(data => res.send(data))
    .catch(err => res.json({ mesagge: err }));
};

exports.getAllStudents = async (_req, res) => {
  const studentProjection = {
    __v: false,
    activo: false
  };
  try {
    const studentFound = await studentSchema.find({}, studentProjection);
    const studentPromises = studentFound.map(async student => {
      const {
        _id,
        nro_identificacion,
        nombre_1,
        nombre_2,
        apellido_1,
        apellido_2,
        fecha_de_nacimiento: fechaDeNacimiento,
        carrera
      } = student;
      const today = new Date();
      const birthDate = new Date(fechaDeNacimiento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const careerFound = await careerSchema.find({ codigo: carrera });
      return {
        id: _id,
        nro_identificacion,
        nombreCompleto: `${nombre_1} ${nombre_2 || ''} ${apellido_1} ${apellido_2 || ''}`,
        fechaDeNacimiento,
        edad: age,
        codigoDeCarrera: carrera,
        NombreDeCarrera: careerFound[0].nombre
      };
    });
    const response = await Promise.all(studentPromises);
    return res.send({ students: response });
  } catch (error) {
    return res.json({ mesagge: error });
  }
};

exports.getStudent = async (req, res) => {
  const { id } = req.params;
  const studentProjection = {
    __v: false,
    activo: false
  };
  try {
    const studentFound = await studentSchema.findById(id, studentProjection);
    if (!studentFound) return res.status(400).json({ mesagge: 'El estudiante no existe' });
    const {
      _id,
      nro_identificacion,
      nombre_1,
      nombre_2,
      apellido_1,
      apellido_2,
      fecha_de_nacimiento: fechaDeNacimiento,
      carrera
    } = studentFound;
    const today = new Date();
    const birthDate = new Date(fechaDeNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    const careerFound = await careerSchema.find({ codigo: carrera });
    const response = {
      id: _id,
      nro_identificacion,
      nombreCompleto: `${nombre_1} ${nombre_2 || ''} ${apellido_1} ${apellido_2 || ''}`,
      fechaDeNacimiento,
      edad: age,
      codigoDeCarrera: carrera,
      NombreDeCarrera: careerFound[0].nombre
    };
    return res.send({ student: response });
  } catch (error) {
    return res.json({ mesagge: error });
  }
};

exports.updateStudent = async (req, res) => {
  const { id: _id } = req.params;
  if (Object.keys(req.body)[0] === 'carrera') {
    const [career] = await careerSchema.find({ codigo: req.body.carrera });
    if (!career || !career.activo) return res.json({ message: 'La carrera elegida no existe' });
  }
  const [studentFound] = await studentSchema.find({ _id });
  if (!studentFound) return res.status(400).json({ message: 'El estudiante no existe' });
  if (studentFound.activo) {
    return res.status(400).json({ message: 'El estudiante ya esta inscrito en una carrera' });
  }
  if (Object.keys(req.body)[0] === 'carrera') {
    return studentSchema
      .updateOne({ _id }, { $set: { ...req.body, activo: true } })
      .then(() => res.send({ mesagge: 'Estudiante actualizado' }))
      .catch(err => res.json({ mesagge: err }));
  }
  return studentSchema
    .updateOne({ _id }, { $set: req.body })
    .then(() => res.send({ mesagge: 'Estudiante actualizado' }))
    .catch(err => res.json({ mesagge: err }));
};

exports.deteleStudent = async (req, res) => {
  const { id: _id } = req.params;
  const studentFound = await studentSchema.find({ _id });
  if (!studentFound.length) return res.json({ message: 'El estudiante no existe' });
  return studentSchema
    .updateOne({ _id }, { $set: { activo: false } })
    .then(() => res.send({ mesagge: 'Estudiante eliminado' }))
    .catch(err => res.json({ mesagge: err }));
};
