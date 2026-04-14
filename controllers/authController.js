const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    // 1. Recibimos las credenciales desde el frontend (o Postman en este caso)
    const { usuario, password } = req.body;

    // 2. Simulamos la validación contra una base de datos o archivo
    if (usuario === 'adminaiep' && password === '1234567') {
        
        // 3. Generamos el Token de acceso (JWT)
        const token = jwt.sign(
            { usuarioId: 1, rol: 'administrador' }, // La información que viaja dentro del token
            process.env.JWT_SECRET,                 // Nuestra firma secreta del .env
            { expiresIn: '1h' }                     // Tiempo de expiración
        );

        // 4. Enviamos el token al cliente en una Cookie
        res.cookie('token', token, {
            httpOnly: true, // CLAVE: Evita que JavaScript del cliente lea la cookie (protege contra XSS)
            secure: false,  // En producción (HTTPS) esto debe ir en true
            maxAge: 3600000 // La cookie vivirá por 1 hora (en milisegundos)
        });

        return res.json({ mensaje: 'Autenticación exitosa. Bienvenido.' });
    }

    // 5. Qué pasa si se equivocan de clave
    return res.status(401).json({ message: "Credenciales incorrectas. No autorizado." });
};

// Función para cerrar sesión
exports.logout = (req, res) => {
    // res.clearCookie le dice al cliente que elimine la cookie especificada
    res.clearCookie('token');
    
    return res.json({ mensaje: 'Sesión cerrada exitosamente. La cookie ha sido destruida.' });
};