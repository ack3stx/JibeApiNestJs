import { Injectable } from '@nestjs/common';
import { ComentariosNotificacion } from './dto/comentarios-notificacion';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComentariosNotifi } from './entities/ComentariosNotifi.entity';
import { Notificaciones } from '../notificaciones/entities/notificacion.entity';
import { OrdenTrabajo } from '../orden-trabajo/entities/orden-trabajo.entity';
import * as nodemailer from 'nodemailer';
import { EmailService } from 'src/config/email.service';

@Injectable()
export class ComentariosNotificacionService {

    constructor(
        @InjectRepository(ComentariosNotifi)
        private readonly comentariosNotifi: Repository<ComentariosNotifi>,
        @InjectRepository(Notificaciones)
        private readonly Notificaciones: Repository<Notificaciones>,
        @InjectRepository(OrdenTrabajo)
        private readonly ordenTrabajo: Repository<OrdenTrabajo>,
        private readonly emailService: EmailService,
    ) {}
    
    async NuevoComentarioNotificacion(ComentariosNotificacion: ComentariosNotificacion): Promise<ComentariosNotifi | string> {
        try {
            const notificacion = await this.Notificaciones.findOne({
                where: { id: ComentariosNotificacion.notificacion_id },
                relations: {
                    usuarioCreador: true,
                    ClaseDepartamentoSubsidiaria: {
                        clase: true,
                        departamento: true,
                        subsidiaria: true
                    }
                }
            });

            if (!notificacion) {
                throw new Error('Notification not found');
            }

            const NuevoComentario = new ComentariosNotifi();
            NuevoComentario.comentario = ComentariosNotificacion.comentario;
            NuevoComentario.fecha = new Date();
            NuevoComentario.notificacion = notificacion;

            console.log(ComentariosNotificacion.estado);
            if(ComentariosNotificacion.comentario === null && ComentariosNotificacion.estado === 'Aceptada'){
                notificacion.estado_notificacion = 'aceptada';
                await this.Notificaciones.save(notificacion);
                
                await this.enviarCorreoActualizacion(notificacion, 'aceptada', '');

                return 'Estado Notificacion Actualizado Correctamente';
            }

            if(ComentariosNotificacion.comentario){
                await this.comentariosNotifi.save(NuevoComentario);
                
                await this.enviarCorreoActualizacion(notificacion, notificacion.estado_notificacion, ComentariosNotificacion.comentario);
            }

            if(ComentariosNotificacion.estado === 'aceptada'){
                notificacion.estado_notificacion = ComentariosNotificacion.estado;
                await this.Notificaciones.save(notificacion);
                
                await this.enviarCorreoActualizacion(notificacion, 'aceptada', ComentariosNotificacion.comentario);
            }
                
            if(ComentariosNotificacion.estado === 'cancelada'){
                notificacion.estado_notificacion = ComentariosNotificacion.estado;
                await this.Notificaciones.save(notificacion);
                
                await this.enviarCorreoActualizacion(notificacion, 'cancelada', ComentariosNotificacion.comentario);
            }

            return "Estado Actualizado Correctamente";
        } catch (error) {
            throw new Error(`Error al crear el comentario: ${error.message}`);
        }
    }
    
    private async enviarCorreoActualizacion(notificacion: Notificaciones, estado: string, comentario: string) {
    try {
        const emailDestino = notificacion.usuarioCreador.email;
        
        let asunto = '';
        let contenido = '';
        
        switch(estado) {
            case 'aceptada':
                asunto = 'Tu notificación ha sido aceptada';
                contenido = `
                    <h2>¡Buenas noticias!</h2>
                    <p>Tu notificación con ID ${notificacion.id} ha sido aceptada.</p>
                    <p><strong>Descripción De La Notificacion:</strong> ${notificacion.descripcion}</p>
                    <p><strong>Fecha:</strong> ${notificacion.fecha_notificacion.toLocaleDateString()}</p>
                    <p><strong>Departamento:</strong> ${notificacion.ClaseDepartamentoSubsidiaria.departamento.nombre}</p>
                    <p><strong>Clase:</strong> ${notificacion.ClaseDepartamentoSubsidiaria.clase.nombre}</p>
                `;
                break;
            case 'cancelada':
                asunto = 'Tu notificación ha sido cancelada';
                contenido = `
                    <h2>Notificación cancelada</h2>
                    <p>Tu notificación con ID ${notificacion.id} ha sido cancelada.</p>
                    <p><strong>Descripción De La Notificacion:</strong> ${notificacion.descripcion}</p>
                    <p><strong>Fecha:</strong> ${notificacion.fecha_notificacion.toLocaleDateString()}</p>
                `;
                break;
            default:
                asunto = 'Actualización en tu notificación';
                contenido = `
                    <h2>Tu notificación ha sido actualizada</h2>
                    <p>Tu notificación con ID ${notificacion.id} ha tenido cambios.</p>
                    <p><strong>Estado actual:</strong> ${estado}</p>
                    <p><strong>Descripción De La Notificacion:</strong> ${notificacion.descripcion}</p>
                    <p><strong>Fecha:</strong> ${notificacion.fecha_notificacion.toLocaleDateString()}</p>
                `;
                break;
        }
        
        if (comentario) {
            contenido += `<p><strong>Mensaje De Soporte De Mantenimiento:</strong> ${comentario}</p>`;
        }
        
        // Usar el EmailService inyectado en lugar de crear un transporter aquí
        const result = await this.emailService.sendMail({
            to: emailDestino,
            subject: asunto,
            html: contenido
        });
        
        console.log(`Correo enviado a ${emailDestino}`);
        console.log(`Estado: ${estado}`);
        console.log(`Comentario: ${comentario}`);
        console.log(`Contenido del correo: ${contenido}`);
        console.log(`Resultado del envío: ${JSON.stringify(result)}`);
        
        
        return result;
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw new Error(`Error al enviar correo: ${error.message}`);
    }
}
}