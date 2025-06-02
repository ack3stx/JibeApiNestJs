import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tecnicos } from './entities/tecnicos.entity';
import { asignacion_tecnicos } from '../asignacion-tecnicos/entities/Asignacion_Tecnicos.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TecnicosService {
    constructor(
        @InjectRepository(tecnicos)
        private tecnicosRepository: Repository<tecnicos>,
        @InjectRepository(asignacion_tecnicos)
        private asignacionTecnicosRepository: Repository<asignacion_tecnicos>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async buscarTecnicos() {
        return await this.tecnicosRepository.find({
            select: {
                id: true,
                nombre: true,
                numero_Telefono: true,
            }
        });
    }

    async obtenerOrdenesPorUsuarioSesion(userId: number) {
        const tecnico = await this.tecnicosRepository.findOne({
            where: { 
                User: { id: userId } 
            }
        });

        console.log(userId);

        if (!tecnico) {
            throw new Error('No se encontró un técnico asociado a este usuario');
        }

        const asignaciones = await this.asignacionTecnicosRepository.find({
            where: {
                tecnicos: { id: tecnico.id }
            },
            relations: {
                orden_trabajo: {
                    notificacion: {
                        ClaseDepartamentoSubsidiaria: {
                            clase: true,
                            departamento: true,
                            subsidiaria: true
                        },
                        usuarioCreador: true
                    }
                }
            }
        });

        return {
            ordenesTrabajo: asignaciones.map(asignacion => ({
                id: asignacion.orden_trabajo.id,
                fecha_inicio: asignacion.orden_trabajo.fecha_inicio,
                fecha_fin: asignacion.orden_trabajo.fecha_fin,
                fecha_creacion: asignacion.orden_trabajo.fecha_creacion,
                estado: asignacion.orden_trabajo.estado,
                notificacion: {
                    id: asignacion.orden_trabajo.notificacion.id,
                    descripcion: asignacion.orden_trabajo.notificacion.descripcion,
                    tipo_notificacion: asignacion.orden_trabajo.notificacion.tipo_notificacion,
                    subsidiaria: asignacion.orden_trabajo.notificacion.ClaseDepartamentoSubsidiaria.subsidiaria.nombre,
                    departamento: asignacion.orden_trabajo.notificacion.ClaseDepartamentoSubsidiaria.departamento.nombre,
                    clase: asignacion.orden_trabajo.notificacion.ClaseDepartamentoSubsidiaria.clase.nombre,
                    solicitante: `${asignacion.orden_trabajo.notificacion.usuarioCreador.Nombre} ${asignacion.orden_trabajo.notificacion.usuarioCreador.Apellido_Paterno} ${asignacion.orden_trabajo.notificacion.usuarioCreador.Apellido_Materno}`,
                }
            }))
        };
    }
}