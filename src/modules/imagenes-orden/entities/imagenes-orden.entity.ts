import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'

@Entity('imagenes_orden')
export class ImagenesOrden {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrdenTrabajo)
    @JoinColumn({ name: 'orden_trabajo_id' })
    orden_trabajo: OrdenTrabajo;

    @Column()
    ruta_imagen: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_imagen' })
    usuario_imagen: User;

    @Column({ type: 'datetime' })
    fecha_imagen: Date;

}