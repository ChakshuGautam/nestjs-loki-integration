import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'TestService',
        transport: {
          targets: [
            {
              level: 'debug',
              target: 'pino-pretty',
            },
            {
              level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn',
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
