import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const strip = (value?: string) =>
          value?.replace(/^["']|["']$/g, '').trim();

        const normalizedDriver = (
          strip(configService.get<string>('DATABASE_DRIVER')) ?? 'postgres'
        ).toLowerCase();

        if (normalizedDriver !== 'postgres') {
          throw new Error('Only postgres DATABASE_DRIVER is supported');
        }

        const rawUrl =
          strip(configService.get<string>('DATABASE_URL')) ??
          'postgres://localhost:5432/films';
        const username =
          strip(configService.get<string>('DATABASE_USERNAME')) ?? 'postgres';
        const password =
          strip(configService.get<string>('DATABASE_PASSWORD')) ?? 'postgres';

        const normalizedUrl = rawUrl.replace(/^postgresql:/i, 'postgres:');
        const parsed = new URL(normalizedUrl.replace(/^postgres:/i, 'http:'));

        return {
          type: 'postgres' as const,
          host: parsed.hostname || 'localhost',
          port: Number(parsed.port || 5432),
          database: parsed.pathname.replace(/^\//, '') || 'films',
          username: parsed.username
            ? decodeURIComponent(parsed.username)
            : username,
          password: parsed.password
            ? decodeURIComponent(parsed.password)
            : password,
          autoLoadEntities: true,
          synchronize: false,
          retryAttempts: 30,
          retryDelay: 2000,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha',
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
