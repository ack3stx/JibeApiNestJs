import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity'
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity('tecnicos')
export class tecnicos{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    numero_Telefono: String;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'User_id' })
    User:User; 

}