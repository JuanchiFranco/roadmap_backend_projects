process.loadEnvFile();

interface Config {
  port: number;
  nodeEnv: string;
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpiration: string;
    refreshExpiration: string;
  };
  cookie: {
    domain: string;
    secure: boolean;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'your_jwt_access_secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret',
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    secure: process.env.COOKIE_SECURE === 'true',
  },
};

export default config;
