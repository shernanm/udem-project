const careerSchema = require('../models/career');
const studentSchema = require('../models/student');

exports.createcareer = (req, res) => {
  const career = careerSchema(req.body);
  return career
    .save()
    .then(careerResponse => res.status(201).send({ career: careerResponse }))
    .catch(error => {
      if (error.code === 11000) return res.status(400).json({ mesagge: 'La carrera ya existe' });
      return res.status(500).json({ mesagge: error.mesagge });
    });
};

exports.getAllcareers = (_req, res) =>
  careerSchema
    .find({})
    .then(careers => res.send({ careers }))
    .catch(error => res.json({ mesagge: error }));

exports.getcareer = (req, res) => {
  const { id } = req.params;
  careerSchema
    .findById(id)
    .then(career => {
      if (!career) return res.send({ mesagge: `No existe carrera con el id ${id}` });
      return res.send({ career });
    })
    .catch(error => res.json({ mesagge: error }));
};

exports.getcareerAndStudents = async (req, res) => {
  const { code: codigo } = req.params;
  const [careerFound] = await careerSchema.find({ codigo });
  if (!careerFound) return res.status(400).json({ mesagge: 'La carrera no existe' });
  if (!careerFound.activo) return res.status(400).json({ mesagge: 'La carrera no esta activa' });
  const studentFound = await studentSchema.find({ carrera: codigo });
  return res.send({ carrera: careerFound, estudiantes: studentFound.filter(student => student.activo) });
};

exports.updatecareer = async (req, res) => {
  const { id: _id } = req.params;
  const careerFound = await careerSchema.find({ _id });
  if (!careerFound.length) return res.json({ message: 'La carrera no existe' });
  return careerSchema
    .updateOne({ _id }, { $set: req.body })
    .then(() => res.send({ mesagge: 'Carrera actualizada' }))
    .catch(error => res.json({ mesagge: error }));
};
exports.detelecareer = async (req, res) => {
  const { id: _id } = req.params;
  const [careerFound] = await careerSchema.find({ _id });
  if (!careerFound) return res.json({ message: 'La carrera no existe' });
  if (!careerFound.activo) return res.json({ message: 'La carrera ya fue eliminada' });
  return careerSchema
    .updateOne({ _id }, { $set: { activo: false } })
    .then(() => {
      res.send({ mesagge: 'Carrera eliminada' });
    })
    .catch(error => res.json({ mesagge: error }));
};
