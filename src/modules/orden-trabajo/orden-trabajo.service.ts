import { Injectable } from '@nestjs/common';
import { OrdenTrabajo } from './entities/orden-trabajo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Notificaciones } from '../notificaciones/entities/notificacion.entity';
import { tecnicos } from '../tecnicos/entities/tecnicos.entity';
import { asignacion_tecnicos } from '../asignacion-tecnicos/entities/Asignacion_Tecnicos.entity';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class OrdenTrabajoService {
    constructor(
        @InjectRepository(OrdenTrabajo)
        private readonly ordenTrabajoRepository: Repository<OrdenTrabajo>,
        @InjectRepository(Notificaciones)
        private readonly NotificacionesRepository: Repository<Notificaciones>,
        @InjectRepository(tecnicos)
        private readonly tecnicosRepository: Repository<tecnicos>,
        @InjectRepository(asignacion_tecnicos)
        private readonly asignacionTecnicosRepository: Repository<asignacion_tecnicos>,
    ){}

    async NewOrdernTrabajo(ordenTrabajo: any): Promise<OrdenTrabajo> {
        try{

            const NuevaOrdenTrabajo = new OrdenTrabajo();
            NuevaOrdenTrabajo.fecha_inicio = ordenTrabajo.fecha_inicio;
            NuevaOrdenTrabajo.fecha_fin = ordenTrabajo.fecha_fin;
            NuevaOrdenTrabajo.estado = ordenTrabajo.estado;
            NuevaOrdenTrabajo.fecha_creacion = new Date();
            NuevaOrdenTrabajo.notificacion = ordenTrabajo.notificacion;
            NuevaOrdenTrabajo.usuarioCreador = ordenTrabajo.usuarioCreador;

            const NotificacionExistente = await this.NotificacionesRepository.findOne({
                where: { id: ordenTrabajo.notificacion.id },
            });
            if(NotificacionExistente){
                NotificacionExistente.estado_notificacion = 'en proceso';
                await this.NotificacionesRepository.save(NotificacionExistente);
            }
            
            await this.ordenTrabajoRepository.manager.save(NuevaOrdenTrabajo);
            
            const tecnico = await this.tecnicosRepository.findOne({
                where: { id: ordenTrabajo.tecnicoResponsable.id },
            });

            if (!tecnico) {
                throw new Error('Tecnico not found');
            }

            const asignacionTecnico = new asignacion_tecnicos();
            asignacionTecnico.orden_trabajo = NuevaOrdenTrabajo;
            console.log('Asignacion Tecnico:', ordenTrabajo.tecnicoResponsable.id);
            asignacionTecnico.tecnicos = tecnico;

            



            await this.ordenTrabajoRepository.manager.save(asignacionTecnico);
            
            await this.enviarNotificacionWhatsApp(
                tecnico.numero_Telefono.toString(), 
                NuevaOrdenTrabajo.id.toString(),
                tecnico.nombre
            );

            return NuevaOrdenTrabajo;
            }
            catch (error) {
                console.error('Error creating new order:', error);
                throw new Error('Failed to create new order');
        }
    }


    async findAllOrdenesDeTrabajoForGerente() {
    const asignaciones = await this.asignacionTecnicosRepository.find({
        relations: {
            tecnicos: true,
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
        },
        select: {
            id: true,
            tecnicos: {
                id: true,
                nombre: true,
                numero_Telefono: true
            },
            orden_trabajo: {
                id: true,
                fecha_inicio: true,
                fecha_fin: true,
                fecha_creacion: true,
                estado: true,
                notificacion: {
                    id: true,
                    descripcion: true,
                    fecha_notificacion: true,
                    estado_notificacion: true,
                    ClaseDepartamentoSubsidiaria: {
                        id: true,
                        clase: {
                            id: true,
                            nombre: true,
                        },
                        departamento: {
                            id: true,
                            nombre: true,
                        },
                        subsidiaria: {
                            id: true,
                            nombre: true,
                        }
                    },
                    usuarioCreador: {
                        id: true,
                        Nombre: true,
                        Apellido_Paterno: true
                    }
                }
            }
        },
        order: {
            orden_trabajo: {
                fecha_creacion: 'DESC'
            }
        }
    });

    return {
        ordenesTrabajo: asignaciones.map(asignacion => ({
            tecnico: asignacion.tecnicos ? {
                id: asignacion.tecnicos.id,
                nombre: asignacion.tecnicos.nombre,
                numero_Telefono: asignacion.tecnicos.numero_Telefono
            } : null,
            id: asignacion.orden_trabajo.id,
            fecha_inicio: asignacion.orden_trabajo.fecha_inicio,
            fecha_fin: asignacion.orden_trabajo.fecha_fin,
            fecha_creacion: asignacion.orden_trabajo.fecha_creacion,
            estado: asignacion.orden_trabajo.estado,
            notificacion: {
                id: asignacion.orden_trabajo.notificacion.id,
                estado_notificacion: asignacion.orden_trabajo.notificacion.estado_notificacion,
                fecha_notificacion: asignacion.orden_trabajo.notificacion.fecha_notificacion,
                descripcion: asignacion.orden_trabajo.notificacion.descripcion,
                subsidiaria: asignacion.orden_trabajo.notificacion.ClaseDepartamentoSubsidiaria.subsidiaria.nombre,
                departamento: asignacion.orden_trabajo.notificacion.ClaseDepartamentoSubsidiaria.departamento.nombre,
                clase: asignacion.orden_trabajo.notificacion.ClaseDepartamentoSubsidiaria.clase.nombre,
                solicitante: `${asignacion.orden_trabajo.notificacion.usuarioCreador.Nombre} ${asignacion.orden_trabajo.notificacion.usuarioCreador.Apellido_Paterno}`
            }
        }))
    };
}

    private async enviarNotificacionWhatsApp(telefono: string, idOrden: string, nombreTecnico: string) {
    try {
        const numeroFormateado = telefono.startsWith('52') ? telefono : `52${telefono}`;
        
        const response = await axios.post(
            'https://graph.facebook.com/v22.0/691308654059535/messages',
            {
                messaging_product: "whatsapp",
                to: numeroFormateado,
                type: "template",
                template: {
                    name: "notificacionnuevaorder",
                    language: {
                        code: "es_MX"
                    },
                    components: [
                        {
                            type: "header",
                            parameters: [
                                {
                                    type: "text",
                                    text: idOrden
                                }
                            ]
                        },
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: nombreTecnico
                                }
                            ]
                        }
                    ]
                }
            },

            {
                headers: {
                    'Authorization': `Bearer ${process.env.TOKEN_WHATSAPP_API}`,
                    'Content-Type': 'application/json'
                }
            }
            
        );

        console.log('Token de WhatsApp:', process.env.TOKEN_WHATSAPP_API),
        console.log('Notificación WhatsApp enviada:', response.data);
        return response.data;
    } catch (error) {
        console.log('Token de WhatsApp:', process.env.TOKEN_WHATSAPP_API);
        console.error('Error enviando notificación WhatsApp:', error.response?.data || error);
    }
}

}
