# Backend Starter Kit

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens)
![pnpm](https://img.shields.io/badge/pnpm-package%20manager-F69220?style=flat&logo=pnpm)

**Plantilla base para APIs REST con Node.js y Express.** Incluye manejo centralizado de errores, respuestas estandarizadas, validacion con Zod, autenticacion JWT, conexion a MySQL mediante pool de conexiones y una arquitectura limpia separada por capas.

## Caracteristicas

- **Express 5**: servidor HTTP con middleware nativo.
- **MySQL2**: pool de conexiones con soporte de promesas.
- **JWT**: middleware de verificacion de tokens listo para usar.
- **Zod**: validacion de esquemas en `body`, `params` y `query`.
- **Respuestas estandarizadas**: formato uniforme para exito y error.
- **Manejo global de errores**: diferencia errores operacionales (4xx) de fallos tecnicos (5xx).
- **CORS**: configurado para desarrollo con frontend en Vite.
- **Plantillas GitHub**: issues de bug/feature y template de PR incluidos.

## Requisitos

- [Node.js](https://nodejs.org/) 18+
- [MySQL](https://www.mysql.com/) 8.0+
- [pnpm](https://pnpm.io/) 8+

## Instalacion

```bash
git clone https://github.com/DAN-DELI/backend-starter-kit.git
cd backend-starter-kit
pnpm install
```

Crea tu archivo `.env` basado en `.env.example` y configura tus credenciales de base de datos.

```bash
pnpm dev
```

El servidor levantara despues de verificar la conexion a la base de datos. Si todo esta bien, veras el banner de inicio en la terminal.

> Este proyecto utiliza `pnpm` como gestor de paquetes. El archivo `pnpm-lock.yaml` esta incluido en el repositorio para garantizar versiones consistentes.

## Usar como base para un nuevo proyecto

Este repositorio esta pensado para clonarse y convertirse en el punto de partida de otro proyecto. No hace falta hacer fork:

```bash
git clone https://github.com/DAN-DELI/backend-starter-kit.git nombre-de-tu-proyecto
cd nombre-de-tu-proyecto
rm -rf .git
git init
git remote add origin https://github.com/tu-usuario/nombre-de-tu-proyecto.git
git add .
git commit -m "init: base desde backend-starter-kit"
git push -u origin main
```

A partir de ahi, modifica `package.json`, renombra el proyecto y empeza a trabajar sobre la estructura existente.

## Scripts

| Script | Descripcion |
|---|---|
| `pnpm dev` | Servidor de desarrollo con nodemon y banner de estado. |
| `pnpm build` | Build optimizado para produccion. |
| `pnpm preview` | Previsualizacion de la build generada. |

## Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

| Variable | Descripcion |
|---|---|
| `PORT` | Puerto donde corre el servidor. |
| `FRONTEND_URL` | Origen permitido por CORS. |
| `DB_HOST` | Host de la base de datos. |
| `DB_USER` | Usuario de MySQL. |
| `DB_PASSWORD` | Contrasena de MySQL. |
| `DB_NAME` | Nombre de la base de datos. |
| `DB_PORT` | Puerto de MySQL. |
| `JWT_SECRET` | Clave secreta para firmar tokens. |
| `JWT_REFRESH_SECRET` | Clave para el refresco de tokens. |
| `NODE_ENV` | Modo actual de uso. |

## Estructura

```
.
|-- .github/            -> Plantillas de issues y PR
|-- sql/                -> Scripts de base de datos
|-- server.js           -> Inicializador principal y test de conexion
|-- package.json
|-- pnpm-lock.yaml      -> Lockfile de dependencias
|-- .env.example
|-- .gitignore
`-- src/
    |-- app.js          -> Configuracion de Express, rutas y middlewares
    |-- config/         -> Pool de conexiones y configuraciones
    |-- controllers/    -> Logica de negocio HTTP
    |-- middlewares/    -> Auth, validacion Zod y errores globales
    |-- models/         -> Consultas a la base de datos
    |-- routes/         -> Definicion de endpoints
    |-- schemas/        -> Esquemas de validacion Zod
    `-- utils/          -> Helpers (respuestas, catchAsync, errores)
```

## Arquitectura

1. **Entrada** (`server.js`): ejecuta test de conexion a la DB, levanta el servidor y pinta el banner de estado.
2. **App** (`src/app.js`): configura Express, CORS, parser de JSON, monta las rutas y registra el middleware de errores global.
3. **Rutas** (`src/routes/`): definen los endpoints y aplican middlewares especificos.
4. **Controladores** (`src/controllers/`): envuelven la logica con `catchAsync` para delegar errores automaticamente.
5. **Modelos** (`src/models/`): interactuan con MySQL mediante el pool de conexiones.
6. **Middlewares** (`src/middlewares/`): validan datos de entrada, verifican JWT y capturan errores no controlados.

## Convenciones de Respuesta

**Exito:**
```json
{
  "success": true,
  "message": "Consulta exitosa",
  "data": [],
  "errors": []
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error de validacion",
  "data": [],
  "errors": [{ "field": "email", "message": "Formato invalido" }]
}
```

## Endpoints de Ejemplo

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/` | Health check del servidor. |
| `GET` | `/example/sindb` | Respuesta estatica sin base de datos. |
| `GET` | `/example/condb` | Consulta a la tabla `users` de la base de datos. |

## Contribucion

1. Haz fork del repositorio o usalo como plantilla.
2. Crea una rama: `git checkout -b feature/nombre-feature`.
3. Verifica que `pnpm dev` levante sin errores y que los endpoints de ejemplo respondan.
4. Abre un Pull Request describiendo el cambio y su motivacion.