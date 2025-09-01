# Weather API
Se trata de una propuesta de solución al [Weather API](https://roadmap.sh/projects/weather-api-wrapper-service) from [roadmap.sh](https://roadmap.sh/).

Una API RESTful para obtener información del clima utilizando Express.js y servicios de proveedores de clima.

## Características

- Consulta de datos climáticos en tiempo real
- Rate limiting para proteger el servidor
- Documentación de endpoints
- Caching con Redis para mejorar el rendimiento
- Configuración de variables de entorno
- Manejo de errores y respuestas consistentes

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (Node Package Manager)
- Redis (para el caching)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JuanchiFranco/weather-api.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=3000
WEATHER_API_KEY=tu_api_key_aqui
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Uso

1. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

2. O inicia el servidor en modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

- `GET /` - Página principal
- `GET /api/weather` - Consulta el clima

## Tecnologías Utilizadas

- Express.js - Framework web de Node.js
- Axios - Cliente HTTP
- Redis - Sistema de almacenamiento en caché
- dotenv - Manejo de variables de entorno
- express-rate-limit - Limitación de solicitudes

## Estructura del Proyecto

```
weather-api/
├── app.js              # Archivo principal de la aplicación
├── config/             # Configuración
├── controllers/        # Controladores
├── public/            # Archivos estáticos
├── routes/            # Rutas de la API
└── services/          # Servicios de negocio
```

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia ISC. Consulta el archivo LICENSE para más detalles.
