# API de Lista de Tareas

Una API RESTful para gestionar tareas (todo) con autenticación de usuarios. Desarrollada con Node.js, Express y Prisma ORM utilizando base de datos MySQL.

Se trata de una propuesta de solución al [Todo List API](https://roadmap.sh/projects/todo-list-api) from [roadmap.sh](https://roadmap.sh/).

## Características

- Autenticación de usuarios (registro, inicio de sesión)
- Autenticación basada en JWT
- Operaciones CRUD para tareas
- Gestión de tareas específicas por usuario
- Validación de entrada
- Manejo de errores
- Cobertura de pruebas

## Tecnologías Utilizadas

- **Entorno de Ejecución**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **ORM**: Prisma
- **Autenticación**: JWT (JSON Web Tokens)
- **Pruebas**: Jest, Supertest
- **Estilo de Código**: JavaScript Standard Style

## Requisitos Previos

- Node.js (versión 14 o superior)
- Base de datos MySQL
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/todo-list-API.git
   cd todo-list-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en el directorio raíz con las siguientes variables:
   ```
   PORT=3000
   DATABASE_URL="mysql://usuario:contraseña@localhost:3306/todo_db"
   JWT_SECRET=tu_clave_secreta_jwt
   ```

4. Configura la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```

## Ejecutando la Aplicación

### Modo Desarrollo
```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000`

### Modo Producción
```bash
npm start
```

## Endpoints de la API

### Autenticación

- `POST /api/users/register` - Registrar un nuevo usuario
- `POST /api/users/login` - Iniciar sesión y obtener token JWT

### Tareas

- `GET /api/todos` - Obtener todas las tareas (requiere autenticación)
- `POST /api/todos` - Crear una nueva tarea (requiere autenticación)
- `PUT /api/todos/:id` - Actualizar una tarea (requiere autenticación)
- `DELETE /api/todos/:id` - Eliminar una tarea (requiere autenticación)

## Pruebas

Ejecuta las pruebas con cobertura:
```bash
npm test
```

## Estructura del Proyecto

```
src/
├── __tests__/           # Archivos de prueba
│   ├── controllers/     # Pruebas de controladores
│   ├── middleware/      # Pruebas de middleware
│   ├── services/        # Pruebas de servicios
│   └── utils/           # Pruebas de utilidades
├── config/             # Archivos de configuración
├── controllers/        # Controladores de rutas
├── middlewares/        # Middlewares personalizados
├── routes/            # Definiciones de rutas
├── services/          # Lógica de negocio
├── utils/             # Funciones de utilidad
└── app.js            # Punto de entrada de la aplicación
```

## Variables de Entorno

- `PORT` - Puerto para el servidor (predeterminado: 3000)
- `DATABASE_URL` - Cadena de conexión a la base de datos MySQL
- `JWT_SECRET` - Clave secreta para la generación de tokens JWT

## Contribuciones

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC - consulta el archivo [LICENSE](LICENSE) para más detalles.
