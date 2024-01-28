import winston from 'winston';
import SlackHook from 'winston-slack-webhook-transport';
import { SLACK_WEBHOOK, PS2_ENV } from './constants';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: PS2_ENV }),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    }),
  ),
});

SLACK_WEBHOOK &&
  logger.add(
    new SlackHook({
      // level: 'warn',
      webhookUrl: SLACK_WEBHOOK,
    }),
  );

logger.add(new winston.transports.Console());

export default logger;
