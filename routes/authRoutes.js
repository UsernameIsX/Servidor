const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos que cuando hagan un POST a esta ruta, se ejecute la función login
router.post('/login', authController.login);

module.exports = router;