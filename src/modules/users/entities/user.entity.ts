import { join } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, DeleteDateColumn } from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Nombre: string;

    @Column()
    Apellido_Paterno: string;

    @Column()
    Apellido_Materno: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Rol)
    @JoinColumn({ name: 'rol_id' })
    rol:Rol;

    @Column({ default: true })
    isActive: string;

    @DeleteDateColumn()
    deletedAt?: Date;

}