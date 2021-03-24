import path from 'path';
import WinstonDaily from 'winston-daily-rotate-file';
import winston, { format, LoggerOptions } from 'winston';

import IOHandler from './IOhandler';
import loggerConfig from '../config/loggerConfig';

const { combine, timestamp, printf, prettyPrint, colorize, errors } = format;

// Directories
const logDir = path.join(__dirname, '..', '..', 'logs');
const errorsDir = path.join(logDir, 'errors');

IOHandler.createDirs([logDir, errorsDir]);

// eslint-disable-next-line no-shadow
const logFormatter = printf(info => {
    const log = `${info.timestamp} ${info.level}: ${info.message}`;
    return info.stack ? `${log}\n${info.stack}` : log;
});

const errorsTransport: winston.transport = new WinstonDaily({
    json: false,
    maxSize: '1m',
    level: 'error',
    frequency: '1h',
    dirname: errorsDir,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD',
    filename: 'errors-%DATE%.log',
});

const logTransport: winston.transport = new WinstonDaily({
    json: false,
    maxSize: '1m',
    level: 'data',
    frequency: '5m',
    dirname: logDir,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD',
    filename: 'log-%DATE%.log',
});

const logFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.simple(), prettyPrint(), logFormatter, errors({ stack: true }));

const consoleLogFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.simple(),
    prettyPrint(),
    logFormatter,
    colorize({ all: true }),
    errors({ stack: true }),
);

const transports = [errorsTransport, logTransport];

const options: LoggerOptions = {
    levels: loggerConfig.levels,
    format: logFormat,
    transports,
};

winston.addColors(loggerConfig.colors);
const logger: winston.Logger = winston.createLogger(options);

// Maybe log to console only when in development
logger.add(
    new winston.transports.Console({
        level: 'data',
        format: consoleLogFormat,
    }),
);

const stream = {
    write: (message: string): void => {
        logger.http(message.substring(0, message.lastIndexOf('\n')));
    },
};

// logger.debug("debug - there's no place like home");
// logger.verbose("verbose - there's no place like home");
// logger.http("info- there's no place like home");
// logger.data("info- there's no place like home");
// logger.info("info - there's no place like home");
// logger.warn("warn - there's no place like home");
// logger.error("error - there's no place like home");
// logger.error(new Error('This is a test error'));

// TODO: Turn this logger into a [static??] class
export { stream, logger };
