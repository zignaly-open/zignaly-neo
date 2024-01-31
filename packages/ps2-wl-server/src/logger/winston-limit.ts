import TransportStream, { TransportStreamOptions } from 'winston-transport';
import hash from 'object-hash';

// based on https://github.com/RedPillGroup/winston-limit-transport
export default class WinstonLimit extends TransportStream {
  timeout: number;
  logger: TransportStream;
  lastLogs: Record<string, number>;

  constructor({
    timeout,
    transport,
    ...rest
  }: { timeout: number; transport: TransportStream } & TransportStreamOptions) {
    super(rest);
    this.timeout = timeout || 15000;
    this.lastLogs = {};
    this.logger = transport!;
  }

  log(info: any, callback: () => void) {
    const { message } = info;
    const logHash = hash({ message });
    const now = Date.now();
    const previousLog = this.lastLogs[logHash];

    if (!previousLog || now > previousLog + this.timeout) {
      this.lastLogs[logHash] = now;
      this.logger.log!(info, callback);
      setTimeout(() => delete this.lastLogs[logHash], this.timeout);
    }
  }
}
