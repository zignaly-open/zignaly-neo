import winston from 'winston';
import { PS2_ENV } from './constants';
import SlackHook from 'winston-slack-webhook-transport';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: PS2_ENV }),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    }),
  ),
});

process.env.SLACK_WEBHOOK &&
  logger.add(
    new SlackHook({
      webhookUrl: process.env.SLACK_WEBHOOK,
    }),
  );

logger.add(new winston.transports.Console());

export default logger;
