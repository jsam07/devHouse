import path from 'path';
import WinstonDaily from 'winston-daily-rotate-file';
import winston, { format, LoggerOptions } from 'winston';

import IOHandler from './IOhandler';
import loggerConfig from '../config/loggerConfig';

const { combine, timestamp, printf } = format;

// Directories
const logDir = path.join(__dirname, '..', '..', 'logs');
const errorsDir = path.join(logDir, 'errors');
const warningDir = path.join(logDir, 'warnings');

IOHandler.createDirs([logDir, errorsDir, warningDir]);

// eslint-disable-next-line no-shadow
const logLineFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
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

const warningsTransport: winston.transport = new WinstonDaily({
    json: false,
    maxSize: '1m',
    level: 'warn',
    frequency: '1h',
    dirname: warningDir,
    handleExceptions: false,
    datePattern: 'YYYY-MM-DD',
    filename: 'warnings-%DATE%.log',
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

const logFormat = combine(
    timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logLineFormat,
    winston.format.colorize(),
);

// new winston.transports.File({ filename: 'logFile.log', level: 'data' })
const transports = [errorsTransport, warningsTransport, logTransport];

const options: LoggerOptions = {
    levels: loggerConfig.levels,
    format: logFormat,
    transports,
};

winston.addColors(loggerConfig.colors);
const logger: winston.Logger = winston.createLogger(options);

// Maybe log to console only when in development
logger.add(new winston.transports.Console({ format: logFormat }));

export default logger;
