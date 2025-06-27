const clienteModel = require('../models/cliente');

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await clienteModel.getClienteById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const newCliente = await clienteModel.createCliente(req.body);
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const updatedCliente = await clienteModel.updateCliente(req.params.id, req.body);
    if (!updatedCliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(updatedCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    await clienteModel.deleteCliente(req.params.id);
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};