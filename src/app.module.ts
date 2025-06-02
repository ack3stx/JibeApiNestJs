import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './modules/users/users.module';
import { NotificacionesModule } from './modules/notificaciones/notificaciones.module';
import { DepartamentoModule } from './modules/departamento/departamento.module';
import { ClasesModule } from './modules/clases/clases.module';
import { SubsidiariaModule } from './modules/subsidiaria/subsidiaria.module';
import { ComentariosNotificacionModule } from './modules/comentarios-notificacion/comentarios-notificacion.module';
import { TecnicosModule } from './modules/tecnicos/tecnicos.module';
import { OrdenTrabajoModule } from './modules/orden-trabajo/orden-trabajo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, 
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }),
    UsersModule,
    NotificacionesModule,
    DepartamentoModule,
    ClasesModule,
    SubsidiariaModule,
    ComentariosNotificacionModule,
    TecnicosModule,
    OrdenTrabajoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}