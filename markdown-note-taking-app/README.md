# Aplicación de Notas en Markdown

Una aplicación de servidor para crear, gestionar y visualizar notas en formato Markdown. Esta aplicación permite a los usuarios guardar notas, visualizarlas como HTML y verificar la gramática de su contenido.

Se trata de una propuesta de solución al [Markdown Note-taking App](https://roadmap.sh/projects/markdown-note-taking-app) from [roadmap.sh](https://roadmap.sh/).

## Características

### Principales

- ✅ Subir y guardar notas en formato Markdown
- ✅ Visualizar notas renderizadas como HTML
- ✅ Verificación de gramática del contenido
- ✅ Listado paginado de notas existentes
- ✅ API RESTful para integración con frontend

### Endpoints de la API

- **Verificar gramática**: `POST /notes/:filename/grammar`
- **Guardar nota**: `POST /notes/`
- **Listar notas**: `GET /notes/`
- **Ver nota como HTML**: `GET /notes/:filename/html`

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/markdown-note-taking-app.git
   cd markdown-note-taking-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (si es necesario) en `src/config/constants.js`

## Uso

### Modo Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` por defecto.

## Documentación de la API

### Crear una nueva nota
```
POST /notes
```
**Cuerpo de la petición:**
```json
{
  "title": "Título de la nota",
  "content": "Contenido en **Markdown**"
}
```

### Listar notas
```
GET /notes?page=1&limit=10
```
Parámetros opcionales:
- `page`: Número de página (por defecto: 1)
- `limit`: Cantidad de resultados por página (por defecto: 10, máximo: 100)

### Ver una nota como HTML
```
GET /notes/nombre-del-archivo.md/html
```

### Verificar gramática
```
POST /notes/nombre-del-archivo.md/grammar
```

## Estructura del Proyecto

```bash
src/
├── config/           # Configuraciones
│   └── constants.js  # Constantes de la aplicación
├── middleware/       # Middlewares personalizados
│   ├── asyncHandler.js # Manejador de funciones asíncronas
│   └── validate.js   # Validación de datos
├── notes/           # Lógica de negocio de notas
│   ├── notesController.js # Controlador de notas
│   ├── notesRoute.js      # Rutas de la API
│   └── notesService.js    # Lógica de servicio de notas
├── utils/           # Utilidades
│   └── file.js      # Funciones de manejo de archivos
├── app.js           # Configuración de Express
└── index.js         # Punto de entrada de la aplicación
```

## Dependencias Principales

- **Express**: Framework web para Node.js
- **Helmet**: Ayuda a proteger aplicaciones Express
- **CORS**: Middleware para habilitar CORS
- **Morgan**: Middleware de registro de solicitudes HTTP
- **Marked**: Compilador de Markdown a HTML
- **Express-validator**: Validación de datos de entrada

## Seguridad

La aplicación incluye varias características de seguridad:
- Validación de entrada en todos los endpoints
- Sanitización de nombres de archivo
- Configuración segura de cabeceras HTTP con Helmet
- Manejo de errores centralizado

## Contribución

Las contribuciones son bienvenidas. Por favor, crea un issue o envía un pull request.

## Licencia

ISC

## ✨ Créditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco
