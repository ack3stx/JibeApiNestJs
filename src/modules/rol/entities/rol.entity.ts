import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// ROL 1 ES PARA SISTEMAS , ROL 2 ES PARA GERENTE DE MTTO 
// ROL 3 ES PARA PLANER/PLANIFICADOR , ROL 4 ES PARA TECNICO ENCARGADO
// ROL 5 ES PARA ADMINISTRADOR

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
}