import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { ClaseDepartamentoSubsidiaria } from '../../clase_departamento_subsidiaria/entities/clase_departamento_subsidiaria.entity';

@Entity('cronograma_preventivo')
export class CronogramaPreventivo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ClaseDepartamentoSubsidiaria)
    @JoinColumn({ name: 'ClaseDepartamentoSubsidiaria_id' })
    ClaseDepartamentoSubsidiaria: ClaseDepartamentoSubsidiaria;

    @Column()
    frecuencia: string;

    @Column()
    horas_estimadas: number;

    @Column()
    estado : string;

    @Column()
    ultimo_mantenimiento: Date;

    @Column()
    proximo_mantenimiento: Date;

}