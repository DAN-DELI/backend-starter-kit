// ========================================================
//                   CONFIGURACION DB
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import mysql from "mysql2/promise";
import "dotenv/config";


// --------------------------------------------------------
// DEFINIR POOL DE CONEXIONES
// --------------------------------------------------------
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


/**
 * Verifica la disponibilidad y estado de la conexión con el pool de la base de datos.
 * 
 * @function testConection
 * @async
 * @returns {Promise<void>} Una promesa que se resuelve si la conexión es exitosa.
 */
export const testConection = () => {
    return pool
        .getConnection()
        .then((connection) => {
            connection.release();
        });
};