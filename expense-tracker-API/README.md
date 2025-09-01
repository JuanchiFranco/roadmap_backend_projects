# Expense Tracker API

API para el seguimiento de gastos personales, desarrollada con Node.js, Express y Prisma ORM.

Se trata de una propuesta de solución al [Expense Tracker API](https://roadmap.sh/projects/expense-tracker-api) from [roadmap.sh](https://roadmap.sh/).

## 📋 Características

- Autenticación de usuarios con JWT
- CRUD completo de gastos
- Categorización de gastos
- Seguridad con rate limiting
- Documentación de la API
- Base de datos MySQL con Prisma ORM

## 🚀 Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- MySQL Server
- Git

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/expense-tracker-api.git
   cd expense-tracker-API
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
   JWT_SECRET=tu_clave_secreta_jwt
   JWT_REFRESH_SECRET=tu_clave_secreta_refresh_token
   ```

4. Ejecuta las migraciones de la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```

5. (Opcional) Ejecuta los seeders para datos de prueba:
   ```bash
   npm run seed
   ```

6. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

   O para producción:
   ```bash
   npm start
   ```

## 🗄️ Estructura del Proyecto

```
src/
├── config/           # Configuraciones
├── controller/       # Controladores
├── middleware/       # Middlewares personalizados
├── routes/           # Rutas de la API
├── services/         # Lógica de negocio
└── utils/            # Utilidades y helpers
prisma/
├── schema.prisma    # Esquema de la base de datos
└── seed.js          # Datos iniciales
```

## 🔐 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/refresh-token` - Refrescar token de acceso

### Gastos
- `GET /api/expenses` - Obtener todos los gastos del usuario
- `GET /api/expenses/:id` - Obtener un gasto específico
- `POST /api/expenses` - Crear un nuevo gasto
- `PUT /api/expenses/:id` - Actualizar un gasto existente
- `DELETE /api/expenses/:id` - Eliminar un gasto

## 🛡️ Seguridad

- Autenticación basada en JWT
- Rate limiting para prevenir ataques de fuerza bruta
- Hasheo de contraseñas con bcrypt
- Manejo centralizado de errores
- Validación de datos de entrada

## 📦 Dependencias Principales

- **Express**: Framework web para Node.js
- **Prisma**: ORM para base de datos
- **jsonwebtoken**: Para autenticación JWT
- **bcrypt**: Para hashear contraseñas
- **cors**: Para habilitar CORS
- **express-rate-limit**: Para limitar peticiones

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ✨ Créditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco
