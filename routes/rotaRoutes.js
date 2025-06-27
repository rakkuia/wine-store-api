const express = require('express');
const router = express.Router();
const rotaController = require('../controllers/rotaController');

router.post('/', rotaController.createRota);

router.get('/pedido/:pedidoId', rotaController.getRotasByPedido);

module.exports = router;