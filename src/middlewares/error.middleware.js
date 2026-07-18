// ========================================================
//           CAPTURADOR DE ERRORES GLOBALES
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import { errorResponse } from '../utils/index.js';

/**
 * Middleware centralizado para el manejo de errores globales.
 * Atrapa cualquier error lanzado en la aplicación y lo formatea 
 * antes de enviarlo al cliente.
 * 
 * @returns {void} Envía una respuesta HTTP formateada mediante errorResponse.
 */
export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isOperational = err.isOperational || (statusCode >= 400 && statusCode < 500);

    console.error(`[ERROR] ${req.method} ${req.originalUrl} >> Status: ${statusCode}`);
    if (!isOperational) {
        console.error(err.stack);
    } else {
        console.error(`Mensaje: ${err.message}`);
    }

    const message = isOperational ? err.message : "Fallo interno del servidor";
    const errors = err.errors || [err.message];

    return errorResponse(res, statusCode, message, errors);
};