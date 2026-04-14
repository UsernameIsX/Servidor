const jwt = require('jsonwebtoken');

// Un middleware es literalmente una función que se pone "en el medio" (middle)
// entre la petición del cliente y el destino final (la ruta).
exports.verificarToken = (req, res, next) => {

    // 1. EXTRAER LA LLAVE: Buscamos en los "bolsillos" del cliente (las cookies)
    // Gracias a la librería cookie-parser que instalamos, podemos leer esto fácilmente.
    const token = req.cookies.token;

    // 2. ¿TIENE LLAVE?: Si no hay token en la cookie, lo rechazamos en la puerta.
    if (!token) {
        return res.status(401).json({ 
            message: "Acceso denegado. No tienes la llave (token) para entrar aquí." 
        });
    }

    // 3. VALIDAR LA LLAVE: Intentamos verificar si el token es real, si fue emitido
    // por nuestro vivero y si no ha caducado.
    try {
        // jwt.verify hace el trabajo pesado. Usa nuestra firma secreta del archivo .env.
        // Si alguien alteró una sola letra del token, esto lanzará un error y saltará al 'catch'.
        const verificado = jwt.verify(token, process.env.JWT_SECRET);

        // 4. GUARDAR LOS DATOS: Si el token es válido, extraemos la información que 
        // guardamos en él (ej: el rol de 'administrador') y se la pegamos a la petición (req).
        // Así, la ruta final sabrá exactamente QUIÉN está entrando.
        req.usuario = verificado;

        // 5. DEJAR PASAR: La función next() es la más importante de un middleware.
        // Le dice a Express: "Todo está en orden, deja que la petición continúe hacia la ruta".
        next();

    } catch (error) {
        // Si el token expiró (pasó 1 hora) o es inventado, cae directamente aquí.
        return res.status(401).json({ 
            message: "Token inválido o ha expirado. Por favor, inicia nuevamente." 
        });
    }
};