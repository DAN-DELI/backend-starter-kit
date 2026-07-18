// ========================================================
//                 MODELO DE EJEMPLO
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import { pool } from '../config/db.js';

/**
 * Modelo de datos de ejemplo
 */
export const ExampleModel = {

    /**
     * Retorna una lista estática de ejemplo con caracteres ordenados alfabéticamente sin consultar la base de datos.
     * 
     * @function simpleExample
     * @async
     * @returns {Promise<string[]>} Una promesa que resuelve un arreglo con cadenas de texto de prueba.
     */
    simpleExample: async () => {
        const rows = ["a", "b", "c"];

        return rows;
    },

    /**
     * Consulta y obtiene todos los registros almacenados en la tabla de usuarios de la base de datos.
     * 
     * @function useDB
     * @async
     * @returns {Promise<Object[]>} Una promesa que resuelve un arreglo de objetos representando a los usuarios encontrados.
     */
    useDB: async () => {
        const [rows] = await pool.query(
            `SELECT * FROM users`);

        return rows;
    }
};