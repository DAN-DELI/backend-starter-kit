// ========================================================
//                  RUTA => /example
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import express from 'express';
import { verifyToken } from "../middlewares/index.js" // Validador de token
import { exampleWithDB, exampleWithoutDB } from '../controllers/index.js';


// Crear sub-enrutador
export const example = express.Router();

/**
 * Verifica el token JWT enviado en la cabecera de autorización para validar la identidad del usuario.
 * 
 * @function verifyToken
 * @param {Function} next - Función para avanzar al siguiente middleware o controlador.
 * @returns {void}
*/
// example.use(verifyToken);


/**
 * Ejemplo de uso con DB
 * @access  Publico
 */
example.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'En ruta base',
        errors: [],
    });
});


/**
 * Ejemplo de uso
 * @access  Publico
*/
example.get('/sindb', exampleWithoutDB);

/**
 * Ejemplo de uso con DB
 * @access  Publico
 */
example.get('/condb', exampleWithDB);