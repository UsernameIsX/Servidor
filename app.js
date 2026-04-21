const express = require('express');
const cookieParser = require('cookie-parser');

const https = require('https');
const fs = require('fs');

require('dotenv').config();

const app = express();

// Middlewares globales
app.use(express.json()); // Para procesar JSON en el body
app.use(cookieParser()); // Para poder leer las cookies entrantes

// Ruta de prueba para saber que el servidor vive
app.get('/api/estado', (req, res) => {
    res.json({ mensaje: 'Servidor en Linea' });
});

// Rutas de autenticación
app.use('/api/auth', require('./routes/authRoutes'));

// Rutas del inventario (Protegidas)
app.use('/api/inventario', require('./routes/stockRoutes'));

const opcionesHttps = {
    key: fs.readFileSync('private_key.pem'), 
    cert: fs.readFileSync('certificate.pem')
};

const PORT = process.env.PORT || 443;

https.createServer(opcionesHttps, app).listen(PORT, () => {
    console.log(`Servidor SEGURO escuchando en https://localhost:${PORT}`);
});