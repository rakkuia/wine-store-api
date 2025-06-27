const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Cria um novo pedido
router.post('/', pedidoController.createPedido);

// Busca um pedido por ID
router.get('/:id', pedidoController.getPedidoById);

module.exports = router;