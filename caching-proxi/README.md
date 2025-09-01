# Proxy con Caché HTTP

Un servidor proxy HTTP ligero con capacidad de almacenamiento en caché, diseñado para mejorar el rendimiento de aplicaciones web al almacenar en caché las respuestas HTTP.

Se trata de una propuesta de solución al [Caching Proxy](https://roadmap.sh/projects/caching-server) from [roadmap.sh](https://roadmap.sh/).

## Características

- Proxy HTTP/HTTPS con soporte para múltiples métodos (GET, POST, etc.)
- Almacenamiento en caché de respuestas usando LRU (Least Recently Used)
- Configuración personalizable de tamaño y tiempo de vida de la caché
- Fácil de configurar y usar
- Soporte para redirecciones HTTP

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/caching-proxy.git
   cd caching-proxi
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

### Iniciar el servidor proxy

```bash
node bin/index.js --port [PUERTO] --origin [URL_ORIGEN]
```

Parámetros:
- `--port`: Puerto en el que se ejecutará el servidor proxy (ej: 3000)
- `--origin`: URL base del servidor de origen (ej: https://ejemplo.com)

### Limpiar la caché

Para limpiar manualmente la caché:

```bash
node bin/index.js --clear-cache
```

## Configuración

La caché está configurada con los siguientes valores por defecto:
- Tamaño máximo: 500 elementos
- Tiempo de vida (TTL): 1 hora (3600000 ms)

Puedes modificar estos valores editando el archivo `src/cache.js`.

## Estructura del Proyecto

```
caching-proxi/
├── bin/
│   └── index.js         # Punto de entrada de la aplicación
├── src/
│   ├── cache.js        # Lógica de almacenamiento en caché
│   └── server.js       # Configuración del servidor proxy
├── node_modules/       # Dependencias
└── package.json        # Configuración del proyecto
```

## Ejemplo de Uso

1. Inicia el servidor proxy apuntando a un sitio web:
   ```bash
   node bin/index.js --port 3000 --origin https://ejemplo.com
   ```

2. Accede a través del proxy:
   ```
   http://localhost:3000/ruta/cualquiera
   ```

   La primera vez que accedas, la petición se enviará al servidor de origen y se almacenará en caché. Las siguientes peticiones idénticas se servirán desde la caché.

## Encabezados HTTP

El proxy incluye los siguientes encabezados personalizados:
- `X-Cache: HIT` - Indica que la respuesta se sirvió desde la caché
- `X-Cache: MISS` - Indica que la respuesta vino del servidor de origen

## Limitaciones

- No almacena en caché respuestas con códigos de error del servidor (5xx)
- No maneja autenticación o autorización
- La caché se almacena en memoria y se pierde al reiniciar el servidor

## Licencia

Este proyecto está bajo la licencia ISC.

## ✨ Créditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco