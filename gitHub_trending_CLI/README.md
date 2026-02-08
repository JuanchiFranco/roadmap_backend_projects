# GitHub Trending CLI 🚀

Una herramienta de línea de comandos (CLI) que interactúa con la API de GitHub para recuperar y mostrar los repositorios en tendencia. Esta herramienta permite a los usuarios especificar un rango de tiempo (día, semana, mes o año) para filtrar los repositorios más populares.

Esta es una herramienta creada como parte del desafío [GitHub Trending CLI](https://roadmap.sh/projects/github-trending-cli) de [roadmap.sh](https://roadmap.sh/).

## 📋 Características

- 🔍 Busca repositorios en tendencia de GitHub
- ⏰ Filtra por rangos de tiempo: día, semana, mes o año
- 🎯 Limita la cantidad de resultados a mostrar
- 🎨 Salida colorizada en la terminal para mejor legibilidad
- 📊 Muestra información clave: nombre, propietario, estrellas, forks, URL y lenguaje

## 🛠️ Requisitos

- Node.js (versión 18 o superior recomendada)
- npm o yarn

## 📥 Instalación

1. Clona este repositorio o descarga los archivos:
```bash
git clone <tu-repositorio>
cd gitHub_trending_CLI
```

2. Instala las dependencias (si las hay):
```bash
npm install
```

## 🚀 Uso

### Comando básico

```bash
node src/index.js
```

Por defecto, muestra los 10 repositorios más populares de la última semana.

### Opciones disponibles

#### `--duration`
Especifica el rango de tiempo para filtrar los repositorios:
- `day` - Repositorios del último día
- `week` - Repositorios de la última semana (por defecto)
- `month` - Repositorios del último mes
- `year` - Repositorios del último año

#### `--limit`
Define la cantidad de repositorios a mostrar (por defecto: 10)

#### `--help`
Muestra la ayuda con todas las opciones disponibles

### Ejemplos de uso

```bash
# Mostrar los 10 repositorios más populares del último día
node src/index.js --duration day

# Mostrar los 20 repositorios más populares del último mes
node src/index.js --duration month --limit 20

# Mostrar los 5 repositorios más populares del último año
node src/index.js --duration year --limit 5

# Mostrar ayuda
node src/index.js --help
```

## 📂 Estructura del proyecto

```
gitHub_trending_CLI/
├── src/
│   └── index.js          # Archivo principal con la lógica de la aplicación
├── utils/
│   └── colors.js         # Módulo de utilidades para colores en la terminal
├── package.json          # Configuración del proyecto
└── README.md            # Documentación del proyecto
```

## 📊 Salida del programa

Para cada repositorio, la herramienta muestra:

- **Name**: Nombre del repositorio (en mayúsculas)
- **Owner**: Propietario/organización del repositorio
- **Stars**: Número de estrellas del repositorio
- **Forks**: Número de forks del repositorio
- **URL**: URL del repositorio en GitHub
- **Language**: Lenguaje de programación principal (muestra "Unknown" si no está definido)

## 🎨 Colores

La aplicación utiliza colores ANSI para mejorar la legibilidad:
- 🟢 **Verde**: Para las etiquetas de información
- ⚪ **Reset**: Para los valores de los datos

## 🔧 Tecnologías utilizadas

- **Node.js**: Runtime de JavaScript
- **ES Modules**: Sistema de módulos moderno de JavaScript
- **GitHub API**: Para obtener información de repositorios
- **Fetch API**: Para realizar peticiones HTTP

## ⚙️ Cómo funciona

1. **Parseo de argumentos**: Lee los argumentos de la línea de comandos
2. **Cálculo de fechas**: Calcula la fecha de inicio según el rango especificado
3. **Consulta a la API**: Realiza una petición a la API de GitHub con los parámetros de búsqueda
4. **Formateo de datos**: Procesa y extrae la información relevante
5. **Visualización**: Muestra los resultados en la terminal con formato colorizado

## 📝 Notas importantes

- La API de GitHub tiene límites de tasa de peticiones. Para uso intensivo, considera autenticarte con un token personal.
- Los resultados se ordenan por número de estrellas en orden descendente.
- La búsqueda se realiza por repositorios creados después de la fecha calculada según la duración especificada.

## 🐛 Manejo de errores

La aplicación incluye manejo básico de errores:
- Si hay un error al obtener datos de la API, se muestra un mensaje de error en rojo
- Validación de argumentos con valores por defecto si no se especifican

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request si encuentras bugs o tienes sugerencias de mejora.

## 📄 Licencia

ISC

## 👨‍💻 Creditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco
