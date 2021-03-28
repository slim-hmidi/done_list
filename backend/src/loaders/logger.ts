import {
  createLogger, transports, config, format,
} from 'winston';

const logger = createLogger({
  level: process.env.LOGS_LEVEL ?? 'debug',
  levels: config.npm.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({}),
  ],
  exitOnError: false,
});

export default logger;
