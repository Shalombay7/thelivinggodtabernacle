export type AppEnv = {
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: number;
  DATABASE_URL?: string;
};

const VALID_NODE_ENVS: AppEnv['NODE_ENV'][] = [
  'development',
  'test',
  'production',
];

export function validateEnv(config: Record<string, unknown>): AppEnv {
  const nodeEnvRaw = typeof config.NODE_ENV === 'string' ? config.NODE_ENV : 'development';
  if (!VALID_NODE_ENVS.includes(nodeEnvRaw as AppEnv['NODE_ENV'])) {
    throw new Error(
      `NODE_ENV must be one of: ${VALID_NODE_ENVS.join(', ')}`,
    );
  }

  const portRaw = config.PORT ?? 3000;
  const port = typeof portRaw === 'string' ? Number.parseInt(portRaw, 10) : Number(portRaw);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT must be a positive integer');
  }

  const databaseUrl = typeof config.DATABASE_URL === 'string' && config.DATABASE_URL.length > 0
    ? config.DATABASE_URL
    : undefined;

  return {
    NODE_ENV: nodeEnvRaw as AppEnv['NODE_ENV'],
    PORT: port,
    DATABASE_URL: databaseUrl,
  };
}