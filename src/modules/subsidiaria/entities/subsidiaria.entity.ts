import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subsidiaria')
export class Subsidiaria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}
