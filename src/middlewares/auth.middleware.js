// ========================================================
//                    AUTENTICACION
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import jwt from 'jsonwebtoken';

import { createError } from '../utils/index.js';


/**
 * Middleware para interceptar la petición, extraer y validar el token JWT desde las cabeceras HTTP.
 * Inyecta los datos decodificados del usuario en el objeto req si el token es válido.
 * 
 * @function verifyToken
 * @returns {void} No retorna ningún valor directamente; transfiere el control al siguiente middleware.
 */
export const verifyToken = (req, res, next) => {
    // Localizar y validar Bearer token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(
            createError("Acceso denegado", 401, ["Token no proporcionado o formato inválido"])
        );
    }

    // Extraer la cadena del token
    const token = authHeader.split(' ')[1];

    try {
        // Verificar la firma con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Inyectar identidad en la peticion
        req.user = decoded;

        // Continuar flujo
        next();

    } catch (error) {
        // Control de errores y traducción

        let mensajeError = "Token inválido o corrupto";

        if (error.name === 'TokenExpiredError') {
            mensajeError = "El tiempo de sesión se agotó, por favor inicie sesión nuevamente";
        }

        return next(
            createError("Acceso denegado", 401, [mensajeError])
        );
    }
};
