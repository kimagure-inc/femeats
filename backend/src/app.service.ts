import { Injectable } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggingService) {}
  getHello(): string {
    this.logger.debug('Debug Message');
    this.logger.log('Info Message');
    this.logger.warn('Warn Message');
    this.logger.error('Error Message', 'error in AppService');
    return 'Hello World!';
  }
}
