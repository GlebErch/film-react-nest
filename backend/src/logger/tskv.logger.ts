import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: unknown, ...optionalParams: unknown[]) {
    const parts = [
      `level=${this.toStringValue(level)}`,
      `message=${this.toStringValue(message)}`,
    ];

    if (optionalParams.length > 0) {
      parts.push(
        `optionalParams=${this.toStringValue(JSON.stringify(optionalParams))}`,
      );
    }

    return `${parts.join('\t')}\n`;
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug?(message: unknown, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose?(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }

  private toStringValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'string') {
      return value.replace(/\t/g, ' ').replace(/\n/g, ' ');
    }

    return String(value).replace(/\t/g, ' ').replace(/\n/g, ' ');
  }
}
