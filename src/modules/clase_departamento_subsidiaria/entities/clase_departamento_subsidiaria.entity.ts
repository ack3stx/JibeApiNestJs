import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Departamentos } from '../../departamento/entities/departamento.entity';
import { clases } from '../../clases/entities/clase.entity';
import { Subsidiaria } from '../../subsidiaria/entities/subsidiaria.entity';

@Entity('clase_departamento_subsidiaria')
export class ClaseDepartamentoSubsidiaria {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Departamentos)
    @JoinColumn({ name: 'departamento_id' })
    departamento: Departamentos;

    @ManyToOne(() => clases)
    @JoinColumn({ name: 'clase_id' })
    clase: clases;

    @ManyToOne(() => Subsidiaria)
    @JoinColumn({ name: 'subsidiaria_id' })
    subsidiaria: Subsidiaria;
}
