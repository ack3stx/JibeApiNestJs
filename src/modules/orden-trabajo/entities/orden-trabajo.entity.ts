import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Notificaciones } from '../../notificaciones/entities/notificacion.entity';
import { ManyToOne , JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'

@Entity('orden_trabajo')
export class OrdenTrabajo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Notificaciones)
    @JoinColumn({ name: 'notificacion_id' })
    notificacion: Notificaciones;

    @Column({ type: 'datetime' })
    fecha_inicio: Date;

    @Column({ type: 'datetime' })
    fecha_fin: Date;

    @Column()
    estado: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_creador_id' })
    usuarioCreador: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'usuario_modificador_id' })
    usuarioModificador: User;

    @Column({ type: 'datetime', nullable: true })
    fecha_creacion: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

}