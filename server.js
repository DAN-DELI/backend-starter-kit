// ========================================================
//              INICIALIZADOR PRINCIPAL
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------

import app from "./src/app.js";
import { testConection } from "./src/config/index.js";


// --------------------------------------------------------
// CONFIGURACION Y CONSTANTES
// --------------------------------------------------------
const FRONTEND = process.env.FRONTEND_URL || "No definido"
const PORT = process.env.PORT || "No definido";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "No definido";

const cyan = "\x1b[36m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";
const reset = "\x1b[0m";
const dim = "\x1b[2m";


// --------------------------------------------------------------- //
//  BANNER DE INICIO EXITOSO
// --------------------------------------------------------------- //
const showBanner = () => {
    console.log(`


    ${dim}──────────────────────────────────────────────────────────────────${reset}

                         ${green}[SERVIDOR ACTIVO]${reset}

    ${dim}──────────────────────────────────────────────────────────────────${reset}
                    ${cyan} FRONTEND    ${reset}${dim}=>${reset}  ${green}${FRONTEND}${reset}
                      ${cyan}BACKEND    ${reset}${dim}=>${reset}  ${green}${DB_HOST}:${PORT}${reset}  
                     ${cyan}DATABASE    ${reset}${dim}=>${reset}  ${green}${DB_NAME}${reset}          
    ${dim}──────────────────────────────────────────────────────────────────${reset}

    ${yellow}◆${reset}  Modo: ${process.env.NODE_ENV || "development"}
    ${yellow}◆${reset}  Iniciado: ${new Date().toLocaleString("es-CO")}
    
    ${dim}──────────────────────────────────────────────────────────────────${reset}
    
    `);
};


// --------------------------------------------------------------- //
//  BANNER DE ERROR EN CONEXION
// --------------------------------------------------------------- //
const showErrorBanner = (errorMessage) => {
    console.log(`

        ${red}[ERROR]${reset}  No se pudo conectar a la base de datos

    
${reset}  ${red}Detalle:${reset} ${errorMessage}
    `);
};


// --------------------------------------------------------------- //
//  INICIO DEL SERVIDOR CON TEST PREVIO
// --------------------------------------------------------------- //
testConection()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            showBanner();
        });
    })
    .catch((error) => {
        showErrorBanner(error.message);
        process.exit(1);
    });