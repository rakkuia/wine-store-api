const express = require('express');
const router = express.Router();
const representanteController = require('../controllers/representanteController');

router.get('/', representanteController.getAllRepresentantes);
router.get('/:id', representanteController.getRepresentanteById);
router.post('/', representanteController.createRepresentante);
router.put('/:id', representanteController.updateRepresentante);
router.delete('/:id', representanteController.deleteRepresentante);

module.exports = router;