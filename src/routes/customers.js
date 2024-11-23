// customers.js
const express = require('express');
const router = express.Router();

// Importamos el controlador
const customerController = require('../controllers/customerController');

// Definimos la ruta para obtener la lista de clientes
router.get('/', customerController.list);

router.post('/add', customerController.save);


router.get('/update/:Id',customerController.edit)//

router.post('/update/:Id', customerController.update);

 
router.get('/delete/:Id',customerController.delete)




module.exports = router;




