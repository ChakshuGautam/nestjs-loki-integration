import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'TestService',
        level: 'trace',
        transport: {
          targets: [
            {
              level: 'trace',
              target: 'pino-pretty',
            },
            {
              level: process.env.NODE_ENV !== 'production' ? 'trace' : 'debug',
              target: 'pino-loki',
              options: {
                batching: true,
                interval: 5,
                host: 'http://localhost:3100',
                labels: {
                  app: 'TestService',
                  namespace: process.env.NODE_ENV || 'development',
                },
              },
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
