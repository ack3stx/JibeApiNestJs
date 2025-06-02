import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Departamentos } from '../../departamento/entities/departamento.entity';
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity('clases')
export class clases {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    ubicacion: string;
}