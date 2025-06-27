const representanteModel = require('../models/representante');

exports.getAllRepresentantes = async (req, res) => {
  try {
    const representantes = await representanteModel.getAllRepresentantes();
    res.json(representantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRepresentanteById = async (req, res) => {
  try {
    const representante = await representanteModel.getRepresentanteById(req.params.id);
    if (!representante) return res.status(404).json({ message: 'Representante não encontrado' });
    res.json(representante);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRepresentante = async (req, res) => {
  try {
    const newRepresentante = await representanteModel.createRepresentante(req.body);
    res.status(201).json(newRepresentante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRepresentante = async (req, res) => {
  try {
    const updatedRepresentante = await representanteModel.updateRepresentante(req.params.id, req.body);
    if (!updatedRepresentante) return res.status(404).json({ message: 'Representante não encontrado' });
    res.json(updatedRepresentante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRepresentante = async (req, res) => {
  try {
    await representanteModel.deleteRepresentante(req.params.id);
    res.json({ message: 'Representante excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};