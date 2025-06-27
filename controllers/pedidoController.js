const pedidoModel = require('../models/pedido');

exports.createPedido = async (req, res) => {
  try {
    const { cliente_id, representante_id, items, ...pedidoData } = req.body;
    
    const pedido = await pedidoModel.createPedido({
      cliente_id,
      representante_id,
      ...pedidoData
    });

    for (const item of items) {
      await pedidoModel.addItemToPedido(pedido.id, item);
    }

    const pedidoCompleto = await pedidoModel.getPedidoById(pedido.id);
    
    res.status(201).json(pedidoCompleto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await pedidoModel.getPedidoById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};