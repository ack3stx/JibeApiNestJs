import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CronogramaPreventivo } from '../../cronograma-preventivo/entities/cronograma-preventivo.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { OrdenTrabajo } from '../../orden-trabajo/entities/orden-trabajo.entity';

@Entity('orden_trabajo_preventivo')
export class OrdenTrabajoPreventivo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CronogramaPreventivo)
    @JoinColumn({ name: 'cronograma_preventivo_id' })
    cronograma_preventivo: CronogramaPreventivo;

    @ManyToOne(() => OrdenTrabajo)
    @JoinColumn({ name: 'orden_trabajo_id' })
    orden_trabajo: OrdenTrabajo;
    
}