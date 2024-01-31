import winston from 'winston';
import SlackHook from 'winston-slack-webhook-transport';
import WinstonLimit from './winston-limit';
import { SLACK_WEBHOOK, PS2_ENV, SLACK_LOG_THROTTLE } from '../constants';

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
    new WinstonLimit({
      level: 'warn',
      timeout: SLACK_LOG_THROTTLE,
      transport: new SlackHook({
        webhookUrl: SLACK_WEBHOOK,
      }),
    }),
  );

logger.add(new winston.transports.Console());

export default logger;
