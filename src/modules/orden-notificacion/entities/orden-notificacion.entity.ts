import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne , JoinColumn } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity';

@Entity('comentarios_orden')
export class ComentariosOrden {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrdenTrabajo)
    @JoinColumn({ name: 'orden_trabajo_id' })
    OrdenTrabajo: OrdenTrabajo

    @Column()
    comentario: string;

    @Column()
    fecha: Date;

}