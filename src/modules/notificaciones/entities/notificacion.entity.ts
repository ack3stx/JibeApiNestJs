import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ComentariosNotifi } from '../../comentarios-notificacion/entities/ComentariosNotifi.entity';
import { ClaseDepartamentoSubsidiaria } from '../../clase_departamento_subsidiaria/entities/clase_departamento_subsidiaria.entity';

@Entity('notificacion')
export class Notificaciones {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ClaseDepartamentoSubsidiaria)
    @JoinColumn({ name: 'ClaseDepartamentoSubsidiaria_id' })
    ClaseDepartamentoSubsidiaria:ClaseDepartamentoSubsidiaria;

    @Column()
    descripcion: string;

    @Column({ type: 'datetime', nullable: true })
    fecha_notificacion: Date;

    @Column()
    estado_notificacion: string;

    @Column()
    tipo_notificacion: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'Usuario_Creador' })
    usuarioCreador:User;
    

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'usuario_modificador_id' })
    usuarioModificador: User;   

    @Column({ type: 'datetime', nullable: true })
    fecha_modificacion: Date;

    @OneToMany(() => ComentariosNotifi, comentario => comentario.notificacion)
    comentarios: ComentariosNotifi[];
    
}