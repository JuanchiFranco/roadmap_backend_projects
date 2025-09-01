import http from 'http';
import https from 'https';
import axios from 'axios';
import express from 'express';
import { getCache, setCache } from './cache.js';

export function startServer(port, origin) {
  const app = express();

  // Preparamos agentes con SNI correcto
  const originHost = new URL(origin).hostname;
  const httpAgent = new http.Agent({ keepAlive: true });
  const httpsAgent = new https.Agent({
    keepAlive: true,
    // Forzamos el servername para SNI
    servername: originHost,
    // En desarrollo podrías usar rejectUnauthorized: false
    rejectUnauthorized: false
  });

  app.use(async (req, res) => {
    const key = `${req.method}:${req.originalUrl}`;
    const cached = getCache(key);
    if (cached) {
      res.set(cached.headers);
      res.set('X-Cache', 'HIT');
      return res.status(cached.status).send(cached.body);
    }

    const target = origin + req.originalUrl;
    console.log(`Fetching from target: ${target}`);

    // Construimos headers limpios para el origen
    const forwardedHeaders = { ...req.headers };
    // 1) Quitamos la cabecera Host que venía de localhost
    delete forwardedHeaders.host;
    // 2) (Opcional) establecemos un Host válido para el origen
    forwardedHeaders.host = originHost;

    try {
      const upstream = await axios.request({
        url: target,
        method: req.method,
        headers: forwardedHeaders,
        data: req.body,
        responseType: 'arraybuffer',
        maxRedirects: 5,
        validateStatus: null,
        httpAgent,
        httpsAgent
      });

      const headers = {};
      Object.entries(upstream.headers).forEach(([k, v]) => headers[k] = v);
      setCache(key, { status: upstream.status, body: upstream.data, headers });

      res.set(headers);
      res.set('X-Cache', 'MISS');
      return res.status(upstream.status).send(upstream.data);

    } catch (err) {
      console.error('Error fetching from target:', err.toString());
      return res.status(502).send('Bad Gateway');
    }
  });

  app.listen(port, () => {
    console.log(`Proxy escuchando en http://localhost:${port} → ${origin}`);
  });

}