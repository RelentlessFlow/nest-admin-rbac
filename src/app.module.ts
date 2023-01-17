import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from './config/env';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { RbacModule } from './rbac/rbac.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', '127.0.0.0'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'admin123456'),
        password: configService.get<string>('DB_PASSWORD', 'root'),
        database: configService.get<string>('DB_DATABASE', 'nest_rbac'),
        charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    AccessControlModule.forRootAsync({
      useFactory: async (): Promise<RolesBuilder> => {
        return new RolesBuilder();
      },
    }),
    RbacModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
