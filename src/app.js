// ========================================================
//                  CONTROLADOR CENTRAL
// ========================================================

// --------------------------------------------------------
// IMPORTACIONES
// --------------------------------------------------------
import express from "express";
import cors from "cors";

import { successResponse } from "./utils/index.js";
import { globalErrorHandler } from "./middlewares/index.js"
import { example } from "./routes/example.route.js";


// --------------------------------------------------------
// CONFIGURACION INICIAL
// --------------------------------------------------------
// Definir instancia
const app = express();

// Habilitar el intercambio de recursos de origen cruzado (CORS)
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
}));

// Parsear cuerpos de peticiones en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

// Endpoint raíz para verificar la disponibilidad del servidor.
app.get('/', (req, res) => { successResponse(200, "Endpoint raiz funcionando") });


// --------------------------------------------------------
// RUTAS DEL SISTEMA
// --------------------------------------------------------
app.use("/example", example);


// --------------------------------------------------------
// EVENTOS FINALES
// --------------------------------------------------------
// Middleware central de manejo de errores.
app.use(globalErrorHandler);

// Exportara
export default app;