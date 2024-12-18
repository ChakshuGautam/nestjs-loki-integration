import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    // Not showing `debug` and `verbose` on console for any level
    // Global level trace works
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
    this.logger.warn('warn');
    this.logger.error('error');
    this.logger.verbose('verbose');
    return 'Hello World!';
  }

  postRequest(q: any): string {
    console.log(q);
    this.logger.debug({ data: q });
    this.logger.warn('warn');
    this.logger.error('error');
    this.logger.verbose('verbose');
    return 'Hello World!';
  }
}
