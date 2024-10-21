import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './books/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './shared/jwt/jwt.module';
import { OrderModule } from './orders/orders.module';
import * as redisStore from 'cache-manager-redis-store';
import config from './config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        no_ready_check: true,
        ttl: 300,
      }),
    }),
    JwtConfigModule,
    OrderModule,
    BookModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
