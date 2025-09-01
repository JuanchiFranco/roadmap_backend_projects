# Servicio de Acortamiento de URLs

Un servicio de API REST para acortar URLs largas, construido con Node.js, Express y Prisma ORM.

Se trata de una propuesta de solución al [URL Shortening Service](https://roadmap.sh/projects/url-shortening-service) from [roadmap.sh](https://roadmap.sh/).

## Características

- Genera URLs cortas y únicas para cualquier URL válida
- Redirige las URLs cortas a su destino original
- Registra estadísticas de acceso a las URLs
- Actualiza o elimina URLs cortas existentes
- Diseño de API RESTful
- Seguro por defecto con Helmet.js
- Registro de solicitudes con Morgan
- CORS habilitado
- Validación de entrada

## Tecnologías Utilizadas

- **Entorno de Ejecución**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL (a través de Prisma ORM)
- **Autenticación**: Ninguna (API pública)
- **Validación**: express-validator
- **Seguridad**: Helmet.js
- **Registros**: Morgan
- **Formato de Código**: Prettier
- **Gestor de Paquetes**: npm

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Base de datos MySQL

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/url-shortening-service.git
   cd url-shortening-service
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en el directorio raíz con el siguiente contenido:
   ```
   DATABASE_URL="mysql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD"
   PORT=3000
   ```

4. Ejecuta las migraciones de la base de datos:
   ```bash
   npx prisma migrate dev
   ```

## Ejecutando la Aplicación

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000` por defecto.

## Endpoints de la API

### Crear una URL Corta
```http
POST /api/urls/shorten
Content-Type: application/json

{
  "url": "https://ejemplo.com/url/muy/larga/para/ser/acortada"
}
```

### Obtener Información de la URL
```http
GET /api/urls/shorten/:shortCode
```

### Actualizar una URL Corta
```http
PUT /api/urls/shorten/:shortCode
Content-Type: application/json

{
  "url": "https://nueva-url.com/ruta/actualizada"
}
```

### Eliminar una URL Corta
```http
DELETE /api/urls/shorten/:shortCode
```

### Obtener Estadísticas de la URL
```http
GET /api/urls/shorten/:shortCode/stats
```

## Formato de Respuesta

Todas las respuestas de la API siguen un formato consistente:

```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": {
    // Datos de la respuesta
  }
}
```

## Manejo de Errores

Los errores se devuelven con los códigos de estado HTTP apropiados y una respuesta JSON que contiene:

```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

## Cómo Contribuir

1. Haz un fork del repositorio
2. Crea tu rama de característica (`git checkout -b caracteristica/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade alguna funcionalidad'`)
4. Haz push a la rama (`git push origin caracteristica/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

ISC

## Agradecimientos

- Construido con ❤️ como parte del camino de aprendizaje de Roadmap.sh

## ✨ Créditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco