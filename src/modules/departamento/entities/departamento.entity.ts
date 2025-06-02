import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departamentos')
export class Departamentos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
}