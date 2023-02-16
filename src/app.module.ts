import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailController } from './mail/mail.controller';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        name: 'mail',
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          connectTimeout: 5000,
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
  ],
  controllers: [AppController, MailController],
  providers: [AppService],
})
export class AppModule {}
