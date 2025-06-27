const vinhoModel = require('../models/vinho');

exports.getAllVinhos = async (req, res) => {
  try {
    const vinhos = await vinhoModel.getAllVinhos();
    res.json(vinhos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVinhoById = async (req, res) => {
  try {
    const vinho = await vinhoModel.getVinhoById(req.params.id);
    if (!vinho) return res.status(404).json({ message: 'Vinho não encontrado' });
    res.json(vinho);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVinho = async (req, res) => {
  try {
    const newVinho = await vinhoModel.createVinho(req.body);
    res.status(201).json(newVinho);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVinho = async (req, res) => {
  try {
    const updatedVinho = await vinhoModel.updateVinho(req.params.id, req.body);
    if (!updatedVinho) return res.status(404).json({ message: 'Vinho não encontrado' });
    res.json(updatedVinho);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVinho = async (req, res) => {
  try {
    await vinhoModel.deleteVinho(req.params.id);
    res.json({ message: 'Vinho excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};