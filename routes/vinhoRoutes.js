const express = require('express');
const router = express.Router();
const vinhoController = require('../controllers/vinhoController');

router.get('/', vinhoController.getAllVinhos);
router.get('/:id', vinhoController.getVinhoById);
router.post('/', vinhoController.createVinho);
router.put('/:id', vinhoController.updateVinho);
router.delete('/:id', vinhoController.deleteVinho);

module.exports = router;