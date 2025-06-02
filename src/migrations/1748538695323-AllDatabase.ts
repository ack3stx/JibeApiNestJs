import { MigrationInterface, QueryRunner } from "typeorm";

export class AllDatabase1748538695323 implements MigrationInterface {
    name = 'AllDatabase1748538695323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subsidiaria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rol\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Nombre\` varchar(255) NOT NULL, \`Apellido_Paterno\` varchar(255) NOT NULL, \`Apellido_Materno\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` varchar(255) NOT NULL DEFAULT 1, \`deletedAt\` datetime(6) NULL, \`rol_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tecnicos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`numero_Telefono\` int NOT NULL, \`User_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departamentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`ubicacion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clase_departamento_subsidiaria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`departamento_id\` int NULL, \`clase_id\` int NULL, \`subsidiaria_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cronograma_preventivo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`frecuencia\` varchar(255) NOT NULL, \`horas_estimadas\` int NOT NULL, \`estado\` varchar(255) NOT NULL, \`ultimo_mantenimiento\` datetime NOT NULL, \`proximo_mantenimiento\` datetime NOT NULL, \`ClaseDepartamentoSubsidiaria_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comentarios_notifi\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comentario\` varchar(255) NOT NULL, \`fecha\` datetime NOT NULL, \`notificacion_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notificacion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(255) NOT NULL, \`fecha_notificacion\` datetime NULL, \`estado_notificacion\` varchar(255) NOT NULL, \`tipo_notificacion\` varchar(255) NOT NULL, \`fecha_modificacion\` datetime NULL, \`ClaseDepartamentoSubsidiaria_id\` int NULL, \`Usuario_Creador\` int NULL, \`usuario_modificador_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orden_trabajo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha_inicio\` datetime NOT NULL, \`fecha_fin\` datetime NOT NULL, \`estado\` varchar(255) NOT NULL, \`fecha_creacion\` datetime NULL, \`fecha_modificacion\` datetime NULL, \`notificacion_id\` int NULL, \`usuario_creador_id\` int NULL, \`usuario_modificador_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orden_trabajo_preventivo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cronograma_preventivo_id\` int NULL, \`orden_trabajo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comentarios_orden\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comentario\` varchar(255) NOT NULL, \`fecha\` datetime NOT NULL, \`orden_trabajo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`imagenes_orden\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ruta_imagen\` varchar(255) NOT NULL, \`fecha_imagen\` datetime NOT NULL, \`orden_trabajo_id\` int NULL, \`usuario_imagen\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Log_Acciones\` (\`id\` int NOT NULL AUTO_INCREMENT, \`accion\` varchar(255) NOT NULL, \`entidad_afectada\` varchar(255) NOT NULL, \`detalles_cambio\` varchar(255) NOT NULL, \`fecha_accion\` datetime NOT NULL, \`ip_usuario\` varchar(255) NOT NULL, \`usuario_id\` int NULL, \`notificacion_id\` int NULL, \`orden_trabajo_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asignacion_tecnicos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`inicio_trabajo\` datetime NOT NULL, \`fin_trabajo\` datetime NOT NULL, \`orden_trabajo_id\` int NULL, \`tecnico_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_685cb01ac5c88b5abb6bbe8aa60\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tecnicos\` ADD CONSTRAINT \`FK_1e42fcb63c3409d3eaa0f729f2a\` FOREIGN KEY (\`User_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clase_departamento_subsidiaria\` ADD CONSTRAINT \`FK_28fc8115cf89344ff13dcc920ff\` FOREIGN KEY (\`departamento_id\`) REFERENCES \`departamentos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clase_departamento_subsidiaria\` ADD CONSTRAINT \`FK_11646d249c4bbb5a82ef34b1d15\` FOREIGN KEY (\`clase_id\`) REFERENCES \`clases\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clase_departamento_subsidiaria\` ADD CONSTRAINT \`FK_6f6a551715f6b8928fc7dd15fdf\` FOREIGN KEY (\`subsidiaria_id\`) REFERENCES \`subsidiaria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cronograma_preventivo\` ADD CONSTRAINT \`FK_8bdc28b664ce8a60d272577f173\` FOREIGN KEY (\`ClaseDepartamentoSubsidiaria_id\`) REFERENCES \`clase_departamento_subsidiaria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_notifi\` ADD CONSTRAINT \`FK_7c9978b5498a087c5a0fff02f26\` FOREIGN KEY (\`notificacion_id\`) REFERENCES \`notificacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacion\` ADD CONSTRAINT \`FK_f833a22052cbb124daf59f1c9eb\` FOREIGN KEY (\`ClaseDepartamentoSubsidiaria_id\`) REFERENCES \`clase_departamento_subsidiaria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacion\` ADD CONSTRAINT \`FK_7a82e0cc90bb76f089685a8d606\` FOREIGN KEY (\`Usuario_Creador\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notificacion\` ADD CONSTRAINT \`FK_0106ab31197f8e8d402b7203f1c\` FOREIGN KEY (\`usuario_modificador_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo\` ADD CONSTRAINT \`FK_09b021e303010e9f7f1127ca702\` FOREIGN KEY (\`notificacion_id\`) REFERENCES \`notificacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo\` ADD CONSTRAINT \`FK_fb46c6be0b4b0d42c56458eb0ad\` FOREIGN KEY (\`usuario_creador_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo\` ADD CONSTRAINT \`FK_3d1d6db427b0940cc00b14db4e1\` FOREIGN KEY (\`usuario_modificador_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo_preventivo\` ADD CONSTRAINT \`FK_85da2c912c42ddc398944782b52\` FOREIGN KEY (\`cronograma_preventivo_id\`) REFERENCES \`cronograma_preventivo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo_preventivo\` ADD CONSTRAINT \`FK_537133c4584445a59c31310019f\` FOREIGN KEY (\`orden_trabajo_id\`) REFERENCES \`orden_trabajo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_orden\` ADD CONSTRAINT \`FK_63d27533b38fa62a8d32fc03d7c\` FOREIGN KEY (\`orden_trabajo_id\`) REFERENCES \`orden_trabajo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`imagenes_orden\` ADD CONSTRAINT \`FK_a8f5c5a67ce10249e7b065fb175\` FOREIGN KEY (\`orden_trabajo_id\`) REFERENCES \`orden_trabajo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`imagenes_orden\` ADD CONSTRAINT \`FK_8d3e2e03df4de84d5127e634880\` FOREIGN KEY (\`usuario_imagen\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Log_Acciones\` ADD CONSTRAINT \`FK_b9a8500cb0c956fa8c39e3cc0c8\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Log_Acciones\` ADD CONSTRAINT \`FK_3e5451499b192d431ad1698fe2c\` FOREIGN KEY (\`notificacion_id\`) REFERENCES \`notificacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Log_Acciones\` ADD CONSTRAINT \`FK_c5b61400a6b50d8264fb55f8153\` FOREIGN KEY (\`orden_trabajo_id\`) REFERENCES \`orden_trabajo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asignacion_tecnicos\` ADD CONSTRAINT \`FK_10beafd0c4c9dcba97689a151e1\` FOREIGN KEY (\`orden_trabajo_id\`) REFERENCES \`orden_trabajo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asignacion_tecnicos\` ADD CONSTRAINT \`FK_6115b46141a1dfa34ad78b34116\` FOREIGN KEY (\`tecnico_id\`) REFERENCES \`tecnicos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asignacion_tecnicos\` DROP FOREIGN KEY \`FK_6115b46141a1dfa34ad78b34116\``);
        await queryRunner.query(`ALTER TABLE \`asignacion_tecnicos\` DROP FOREIGN KEY \`FK_10beafd0c4c9dcba97689a151e1\``);
        await queryRunner.query(`ALTER TABLE \`Log_Acciones\` DROP FOREIGN KEY \`FK_c5b61400a6b50d8264fb55f8153\``);
        await queryRunner.query(`ALTER TABLE \`Log_Acciones\` DROP FOREIGN KEY \`FK_3e5451499b192d431ad1698fe2c\``);
        await queryRunner.query(`ALTER TABLE \`Log_Acciones\` DROP FOREIGN KEY \`FK_b9a8500cb0c956fa8c39e3cc0c8\``);
        await queryRunner.query(`ALTER TABLE \`imagenes_orden\` DROP FOREIGN KEY \`FK_8d3e2e03df4de84d5127e634880\``);
        await queryRunner.query(`ALTER TABLE \`imagenes_orden\` DROP FOREIGN KEY \`FK_a8f5c5a67ce10249e7b065fb175\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_orden\` DROP FOREIGN KEY \`FK_63d27533b38fa62a8d32fc03d7c\``);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo_preventivo\` DROP FOREIGN KEY \`FK_537133c4584445a59c31310019f\``);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo_preventivo\` DROP FOREIGN KEY \`FK_85da2c912c42ddc398944782b52\``);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo\` DROP FOREIGN KEY \`FK_3d1d6db427b0940cc00b14db4e1\``);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo\` DROP FOREIGN KEY \`FK_fb46c6be0b4b0d42c56458eb0ad\``);
        await queryRunner.query(`ALTER TABLE \`orden_trabajo\` DROP FOREIGN KEY \`FK_09b021e303010e9f7f1127ca702\``);
        await queryRunner.query(`ALTER TABLE \`notificacion\` DROP FOREIGN KEY \`FK_0106ab31197f8e8d402b7203f1c\``);
        await queryRunner.query(`ALTER TABLE \`notificacion\` DROP FOREIGN KEY \`FK_7a82e0cc90bb76f089685a8d606\``);
        await queryRunner.query(`ALTER TABLE \`notificacion\` DROP FOREIGN KEY \`FK_f833a22052cbb124daf59f1c9eb\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_notifi\` DROP FOREIGN KEY \`FK_7c9978b5498a087c5a0fff02f26\``);
        await queryRunner.query(`ALTER TABLE \`cronograma_preventivo\` DROP FOREIGN KEY \`FK_8bdc28b664ce8a60d272577f173\``);
        await queryRunner.query(`ALTER TABLE \`clase_departamento_subsidiaria\` DROP FOREIGN KEY \`FK_6f6a551715f6b8928fc7dd15fdf\``);
        await queryRunner.query(`ALTER TABLE \`clase_departamento_subsidiaria\` DROP FOREIGN KEY \`FK_11646d249c4bbb5a82ef34b1d15\``);
        await queryRunner.query(`ALTER TABLE \`clase_departamento_subsidiaria\` DROP FOREIGN KEY \`FK_28fc8115cf89344ff13dcc920ff\``);
        await queryRunner.query(`ALTER TABLE \`tecnicos\` DROP FOREIGN KEY \`FK_1e42fcb63c3409d3eaa0f729f2a\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_685cb01ac5c88b5abb6bbe8aa60\``);
        await queryRunner.query(`DROP TABLE \`asignacion_tecnicos\``);
        await queryRunner.query(`DROP TABLE \`Log_Acciones\``);
        await queryRunner.query(`DROP TABLE \`imagenes_orden\``);
        await queryRunner.query(`DROP TABLE \`comentarios_orden\``);
        await queryRunner.query(`DROP TABLE \`orden_trabajo_preventivo\``);
        await queryRunner.query(`DROP TABLE \`orden_trabajo\``);
        await queryRunner.query(`DROP TABLE \`notificacion\``);
        await queryRunner.query(`DROP TABLE \`comentarios_notifi\``);
        await queryRunner.query(`DROP TABLE \`cronograma_preventivo\``);
        await queryRunner.query(`DROP TABLE \`clase_departamento_subsidiaria\``);
        await queryRunner.query(`DROP TABLE \`clases\``);
        await queryRunner.query(`DROP TABLE \`departamentos\``);
        await queryRunner.query(`DROP TABLE \`tecnicos\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
        await queryRunner.query(`DROP TABLE \`subsidiaria\``);
    }

}
