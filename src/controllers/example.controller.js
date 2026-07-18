// ========================================================
//              CONTROLADOR DE EJEMPLO
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import { ExampleModel } from "../models/index.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

/**
 * Maneja la petición HTTP para obtener un resultado estático de ejemplo sin consultar la base de datos.
 * 
 * @function exampleWithoutDB
 * @async
 * @returns {Promise<void>} Una promesa que resuelve el envío de la respuesta HTTP.
 */
export const exampleWithoutDB = catchAsync(async (req, res, next) => {

    // Obtener los datos del modelo
    const result = await ExampleModel.simpleExample();

    // Retornar respuesta
    return successResponse(res, 200, "Consulta exitosa", result);
});


/**
 * Maneja la petición HTTP para consultar y retornar todos los usuarios desde la base de datos.
 * 
 * @function exampleWithDB
 * @async
 * @returns {Promise<void>} Una promesa que resuelve el envío de la respuesta HTTP.
 */
export const exampleWithDB = catchAsync(async (req, res, next) => {
    const result = await ExampleModel.useDB();

    return successResponse(res, 200, "Consulta exitosa", result);
});