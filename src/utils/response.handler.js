// ========================================================
//                 RESPUESTAS ESTANDARIZADAS
// ========================================================

/**
 * Envía una respuesta HTTP exitosa con un formato estandarizado.
 * 
 * @function successResponse
 * @param {number} statusCode - Código de estado HTTP.
 * @param {string} message - Mensaje descriptivo del resultado.
 * @param {Array|Object} [data=[]] - Datos adicionales para incluir en la respuesta.
 */
export const successResponse = (res, statusCode, message, data = []) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
        errors: [],
    });
};

/**
 * Envía una respuesta HTTP de error con un formato estandarizado.
 * 
 * @function errorResponse
 * @param {number} statusCode - Código de estado HTTP.
 * @param {string} message - Mensaje descriptivo del error.
 * @param {Array|string|Object} [errors=[]] - Detalles o lista de errores específicos.
 */
export const errorResponse = (res, statusCode, message, errors = []) => {
    // Formatear "errors" siempre como arreglo
    const formattedErrors = Array.isArray(errors) ? errors : [errors];

    return res.status(statusCode).json({
        success: false,
        message: message,
        data: [],
        errors: formattedErrors,
    });
};


/**
 * Crea un objeto de error personalizado para su manejo centralizado en la API.
 * 
 * @function createError
 * @param {string} message - Mensaje principal del error.
 * @param {number} statusCode - Código de estado HTTP asociado.
 * @param {Array} [details=[]] - Detalles o causas específicas del error.
 * @returns {Error} Instancia modificada de Error con propiedades operacionales.
 */
export const createError = (message, statusCode, details = []) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.isOperational = true;
    err.errors = details.length ? details : [message];

    return err;
};