import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne , JoinColumn } from 'typeorm';
import { Notificaciones } from '../../notificaciones/entities/notificacion.entity';

@Entity('comentarios_notifi')
export class ComentariosNotifi {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comentario: string;

    @Column()
    fecha: Date;

    @ManyToOne(() => Notificaciones)
    @JoinColumn({ name: 'notificacion_id' })
    notificacion: Notificaciones;
}