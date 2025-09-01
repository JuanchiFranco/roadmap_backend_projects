# Blogging Platform API

Una API REST para una plataforma de blogging desarrollada con Node.js y Express.

Se trata de una propuesta de solución al [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api) from [roadmap.sh](https://roadmap.sh/).

## 🚀 Características

- 📝 Gestión completa de posts de blog
- 📱 API RESTful
- 🔐 Configuración de entorno con dotenv
- 📊 Integración con MySQL
- 🔄 Desarrollo en modo módulo ES6

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- MySQL (versión 8.0 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JuanchiFranco/blogging-platform-API.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=blogging_platform
```

4. Inicia el servidor:
```bash
npm run dev
```

## 📚 Estructura del Proyecto

```
blogging-platform-api/
├── app.js                # Archivo principal de la aplicación
├── config/               # Configuración de la base de datos
├── modules/              # Módulos de la aplicación
│   └── blog/            # Módulo de blog
│       └── routes/      # Rutas de la API
├── public/              # Archivos estáticos
├── .env                 # Variables de entorno
└── package.json         # Dependencias y scripts
```

## 📚 Endpoints de la API

### Blog Posts

- `GET /api/blogs` - Lista todos los blogs
- `POST /api/blogs` - Crea un nuevo blog
- `GET /api/blogs/:id` - Obtiene un blog específico
- `PUT /api/blogs/:id` - Actualiza un blog existente
- `DELETE /api/blogs/:id` - Elimina un blog

## 📝 Licencia

Este proyecto está bajo la licencia ISC. Consulta el archivo LICENSE para más detalles.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, crea un issue o pull request para sugerir mejoras.
