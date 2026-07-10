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
        const normalizedDriver = (
          configService.get<string>('DATABASE_DRIVER') ?? 'postgres'
        )
          .replace(/"/g, '')
          .trim()
          .toLowerCase();

        if (normalizedDriver !== 'postgres') {
          throw new Error('Only postgres DATABASE_DRIVER is supported');
        }

        return {
          type: 'postgres' as const,
          url:
            configService.get<string>('DATABASE_URL') ??
            'postgres://localhost:5432/afisha',
          username:
            configService.get<string>('DATABASE_USERNAME') ?? 'postgres',
          password:
            configService.get<string>('DATABASE_PASSWORD') ?? 'postgres',
          autoLoadEntities: true,
          synchronize: false,
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
