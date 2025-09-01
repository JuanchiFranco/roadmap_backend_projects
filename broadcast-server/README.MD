# Broadcast Server

Una aplicación de chat en tiempo real construida con Node.js, Express y Socket.IO que permite a múltiples clientes conectarse e intercambiar mensajes en tiempo real.

Se trata de una propuesta de solución al [Broadcast Server](https://roadmap.sh/projects/broadcast-server) from [roadmap.sh](https://roadmap.sh/).

## Características

- Transmisión de mensajes en tiempo real a todos los clientes conectados
- Seguimiento de conexión/desconexión de usuarios
- Interfaz de línea de comandos simple para enviar mensajes
- Puerto del servidor configurable mediante variables de entorno

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanchiFranco/broadcast-server.git
   cd broadcast-server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

Puedes configurar el puerto del servidor estableciendo la variable de entorno `PORT` en un archivo `.env`:

```
PORT=3000
```

Si no se especifica ningún puerto, se usará el puerto 3000 por defecto.

## Uso

### Iniciar el Servidor

Para iniciar el servidor de chat, ejecuta:

```bash
node index.js start
```

O usando el script de npm:

```bash
npm run dev start
```

### Conectar Clientes

Para conectar un cliente al servidor, abre una nueva ventana de terminal y ejecuta:

```bash
node index.js connect
```

O usando el script de npm:

```bash
npm run dev connect
```

Puedes abrir múltiples terminales y ejecutar el comando de conexión en cada una para simular múltiples usuarios.

### Enviar Mensajes

Una vez conectado, simplemente escribe tu mensaje y presiona Enter para enviarlo a todos los clientes conectados.

## Estructura del Proyecto

- `index.js` - Punto de entrada principal que maneja los argumentos de línea de comandos
- `server/` - Contiene la lógica del lado del servidor
  - `index.js` - Implementación del servidor con Socket.IO
- `client/` - Contiene la lógica del lado del cliente
  - `index.js` - Implementación del cliente para conectarse al servidor

## Dependencias

- [Express](https://expressjs.com/es/) - Framework web para Node.js
- [Socket.IO](https://socket.io/) - Comunicación bidireccional en tiempo real basada en eventos
- [Nodemon](https://nodemon.io/) - Utilidad para reiniciar automáticamente el servidor durante el desarrollo

## Licencia

ISC

## Agradecimientos

- Construido con ❤️ como parte del camino de aprendizaje de Roadmap.sh

## ✨ Créditos

- [Juanchi Franco](https://github.com/JuanchiFranco)

---

Hecho con ❤️ por Juanchi Franco