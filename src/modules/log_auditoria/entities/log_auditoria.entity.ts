import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'
import { Notificaciones } from '../../notificaciones/entities/notificacion.entity';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity';

@Entity('Log_Acciones')
export class LogAcciones {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;

    @Column()
    accion: string;

    @Column()
    entidad_afectada: string;

    @ManyToOne(() => Notificaciones)
    @JoinColumn({ name: 'notificacion_id' })
    notificacion: Notificaciones;

    @ManyToOne(() => OrdenTrabajo)
    @JoinColumn({ name: 'orden_trabajo_id' })
    orden_trabajo: OrdenTrabajo;

    @Column()
    detalles_cambio: string;

    @Column({ type: 'datetime' })
    fecha_accion: Date;

    @Column()
    ip_usuario: string;

}