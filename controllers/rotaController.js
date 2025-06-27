const rotaModel = require('../models/rota');

exports.createRota = async (req, res) => {
  try {
    const newRota = await rotaModel.createRota(req.body);
    res.status(201).json(newRota);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRotasByPedido = async (req, res) => {
  try {
    const rotas = await rotaModel.getRotasByPedido(req.params.pedidoId);
    res.json(rotas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};