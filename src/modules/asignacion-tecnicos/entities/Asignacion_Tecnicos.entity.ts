import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { tecnicos } from '../../tecnicos/entities/tecnicos.entity'
@Entity('asignacion_tecnicos')

export class asignacion_tecnicos {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrdenTrabajo)
    @JoinColumn({ name: 'orden_trabajo_id' })
    orden_trabajo: OrdenTrabajo;

    @ManyToOne(() => tecnicos)
    @JoinColumn({ name: 'tecnico_id' })
    tecnicos: tecnicos;

    @Column({ type: 'datetime'})
    inicio_trabajo: Date;

    @Column({ type: 'datetime'})
    fin_trabajo: Date;

}