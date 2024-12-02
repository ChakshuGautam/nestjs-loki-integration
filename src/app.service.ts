import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    // this.logger.verbose({ foo: 'bar' }, 'baz %s', 'qux');
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
    this.logger.warn('foobar');
    this.logger.error('foobar');
    this.logger.verbose('foobar');
    return 'Hello World!';
  }
}
