# Herramienta CLI para TMDB

Una herramienta de línea de comandos (CLI) para obtener y mostrar información de películas de The Movie Database (TMDB) API.

Se trata de una propuesta de solución al [TMDB CLI Tool](https://roadmap.sh/projects/tmdb-cli) from [roadmap.sh](https://roadmap.sh/).

## Características

- Obtener películas populares
- Obtener películas mejor valoradas
- Obtener próximos estrenos
- Obtener películas en cartelera
- Salida formateada con colores para mejor legibilidad

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Token de acceso a la API de TMDB

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/tmdb-cli-tool.git
   cd tmbd-cli-tool
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en el directorio raíz y agrega tus credenciales de la API de TMDB:
   ```
   TMDB_ACCESS_TOKEN=tu_token_de_acceso_aqui
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

## Uso

Ejecuta la herramienta con el siguiente comando:

```bash
node bin/tmdb.js --type <tipo>
```

### Tipos Disponibles

- `popular` - Películas populares
- `top` - Películas mejor valoradas
- `upcoming` - Próximos estrenos
- `playing` - Películas en cartelera

### Ejemplo

```bash
node bin/tmdb.js --type popular
```

### Salida

La herramienta mostrará una lista de películas con la siguiente información para cada una:
- Título (en azul)
- Fecha de lanzamiento (en verde)
- Sinopsis (en gris)

## Estructura del Proyecto

```
tmbd-cli-tool/
├── bin/
│   └── tmdb.js         # Punto de entrada principal
├── src/
│   ├── api/
│   │   └── tmdbService.js  # Servicio de la API de TMDB
│   ├── cli/
│   │   └── argsParser.js   # Analizador de argumentos de línea de comandos
│   ├── config/
│   │   └── constants.js    # Constantes de configuración
│   └── utils/
│       └── formatter.js    # Utilidades de formato de salida
├── .env.example           # Archivo de ejemplo para variables de entorno
├── package.json
└── README.md
```

## Dependencias

- `axios` - Para realizar peticiones HTTP a la API de TMDB
- `yargs` - Para analizar los argumentos de línea de comandos
- `chalk` - Para dar formato de colores a la salida en consola

## Variables de Entorno

- `TMDB_ACCESS_TOKEN` - Tu token de acceso a la API de TMDB
- `TMDB_BASE_URL` - URL base para la API de TMDB (por defecto: `https://api.themoviedb.org/3`)

## Manejo de Errores

La herramienta incluye manejo básico de errores para:
- Tipos de película inválidos
- Fallos en las peticiones a la API
- Variables de entorno faltantes o inválidas

## Licencia

ISC

## ✨ Créditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco