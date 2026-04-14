const express = require('express');
const router = express.Router();
// Importamos a nuestro middleware (el guardia)
const { verificarToken } = require('../middlewares/authMiddleware');

// Fíjate en la sintaxis: ponemos 'verificarToken' JUSTO EN EL MEDIO
// entre la ruta ('/') y la respuesta final (req, res).
router.get('/', verificarToken, (req, res) => {
    
    // Estos datos simulan información sensible de la base de datos
    const inventarioSecreto = [
        { id: 1, especie: 'cables', stock: 38 },
        { id: 2, especie: 'conectores', stock: 200 }
    ];

    // Podemos saludar al usuario por su rol porque el middleware 
    // lo guardó gentilmente en 'req.usuario' en el paso 4.
    res.json({ 
        mensaje: `Acceso concedido. Has entrado como: ${req.usuario.rol}`,
        datos: inventarioSecreto 
    });
});

module.exports = router;