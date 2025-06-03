import { Injectable } from '@nestjs/common';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificaciones } from './entities/notificacion.entity';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ComentariosNotifi } from '../comentarios-notificacion/entities/ComentariosNotifi.entity';
import { ClaseDepartamentoSubsidiaria } from '../clase_departamento_subsidiaria/entities/clase_departamento_subsidiaria.entity';
import { BusquedasFiltradasDto } from './dto/busquedasFiltradas.dto';


@Injectable()
export class NotificacionesService {
    private genAI: GoogleGenerativeAI;
    constructor(
      @InjectRepository(Notificaciones)
      private readonly notificacionRepository: Repository<Notificaciones>,

      @InjectRepository(ClaseDepartamentoSubsidiaria)
      private readonly claseDepartamentoSubsidiariaRepository: Repository<ClaseDepartamentoSubsidiaria>,

    ) {
        this.genAI = new GoogleGenerativeAI("AIzaSyD80U3MbbIPgrhKTLYMwdh7ltWd2aRlZ4s");
    }
    create(createNotificacioneDto: CreateNotificacioneDto) {
      return 'This action adds a new notificacione';
    }

    findAll() {
      return `This action returns all notificaciones`;
    }

    // FUNCION PARA GENERAR UNA DESCRIPCION CORTA DE LA NOTIFICACION
    private async generateTitle(descripcion: string): Promise<string> {
          try {
              const model = this.genAI.getGenerativeModel({ 
                  model: 'gemini-2.0-flash'
              });

              const prompt = `INSTRUCCIÓN: Genera un resumen corto (máximo 10 palabras) para esta descripción. NO agregues ningún otro texto, explicación o saludo.
                  RESTRICCIONES:
                  - SOLO DEBE SER UN RESUMEN DE EL PROMPT
                  - NO DEBE SER UNA RESPUESTA A UNA PREGUNTA
                  - SIN saludos
                  - SIN explicaciones
                  - SIN puntos suspensivos
                  - SIN símbolos especiales
                  DESCRIPCIÓN: ${descripcion}
                  
                  NO agregues ningún otro texto, explicación o saludo. solo debe ser un resumen en base a lo que te mande y eso es todo lo que debes de hacer`
                  ;

              const result = await model.generateContent([
                  { text: prompt }
              ]);
              
              return result.response.text();
          } catch (error) {
              console.error('Error:', error);
              console.error('Error específico:', {
              message: error.message,
              status: error.status,
              details: error.errorDetails
              });
              return 'Error al generar título';

          }
      }

    //FUNCION PARA CREAR NOTIFICACIONES POR LOS USUARIOS
    async createNotificacion(notificacionData: any) {
    try {
        const titulo_sugerido = await this.generateTitle(notificacionData.descripcion);
        
        const claseDepartamentoSubsidiaria = await this.claseDepartamentoSubsidiariaRepository.findOne({
            where: {
                clase: { id: notificacionData.clase_id },
                departamento: { id: notificacionData.departamento_id },
                subsidiaria: { id: notificacionData.subsidiaria_id }
            }
        });
        
        if (!claseDepartamentoSubsidiaria) {
            throw new Error('No se encontró la combinación de clase, departamento y subsidiaria');
        }
        
        const Notificacion = new Notificaciones();
        Notificacion.descripcion = notificacionData.descripcion;
        Notificacion.fecha_notificacion = new Date();
        Notificacion.tipo_notificacion = notificacionData.tipo_notificacion;
        Notificacion.estado_notificacion = notificacionData.estado_notificacion;
        Notificacion.ClaseDepartamentoSubsidiaria = claseDepartamentoSubsidiaria;
        Notificacion.usuarioCreador = notificacionData.usuarioCreador;
        Notificacion.usuarioModificador = notificacionData.usuarioModificador;
        
        await this.notificacionRepository.save(Notificacion);
        
        return {
            Notificacion,
            titulo_sugerido
        };
    } catch (error) {
        console.error('Error al crear notificación:', error);
        throw new Error(`Error al crear notificación: ${error.message}`);
    }
}

    // FUNCION PARA MOSTAR TODAS LAS NOTIFICACIONES CON DATOS DEL USUARIO QUE LAS CREO
    async findAllNotificacionesForGerente() {
    return this.notificacionRepository.find({
        relations: {
            ClaseDepartamentoSubsidiaria: {
                clase: true,
                departamento: true,
                subsidiaria: true
            },
            usuarioCreador: true,
            comentarios: true
        },
        select: {
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
                Apellido_Paterno: true,
                Apellido_Materno: true,
                email: true
            }
        },
        order: {
            fecha_notificacion: 'DESC'
        }
    });
}

      // FUNCION PARA NOTIFICAR A LOS USUARIOS SUS NOTIFICACIONES DE ELLOS MISMOS
      async findAllNotificacionesForUser(userId: number) {
        console.log('userId', userId)

          return this.notificacionRepository.find({
              relations: {
                ClaseDepartamentoSubsidiaria: {
                    clase: true,
                    departamento: true,
                    subsidiaria: true
                },
                comentarios: true
              },
              where: {
                  usuarioCreador: { id: userId }
              },
              order: {
                  fecha_notificacion: 'DESC'
              }
          });
      }



      async BuscarNotificacionesFiltros(BusquedasFiltradasDto){

        if(BusquedasFiltradasDto.id_User && BusquedasFiltradasDto.Estado_Notificacion && BusquedasFiltradasDto.tipo_Notificacion && BusquedasFiltradasDto.fecha_Inicio && BusquedasFiltradasDto.fecha_Fin){
          return this.notificacionRepository.find({
            relations: {
              ClaseDepartamentoSubsidiaria: {
                clase: true,
                departamento: true,
                subsidiaria: true
              },
              usuarioCreador: true,
              comentarios: true
            },
            where: {
              usuarioCreador: { id: BusquedasFiltradasDto.id_User },
              estado_notificacion: BusquedasFiltradasDto.Estado_Notificacion,
              tipo_notificacion: BusquedasFiltradasDto.tipo_Notificacion,
              fecha_notificacion: Between(BusquedasFiltradasDto.fecha_Inicio, BusquedasFiltradasDto.fecha_Fin)
            },
            order: {
              fecha_notificacion: 'DESC'
            }
          });
      }
    else if(BusquedasFiltradasDto.id_User && BusquedasFiltradasDto.Estado_Notificacion){
        return this.notificacionRepository.find({
            relations: {
                ClaseDepartamentoSubsidiaria: {
                clase: true,
                departamento: true,
                subsidiaria: true
                },
                usuarioCreador: true,
                comentarios: true
            },
            where: {
                usuarioCreador: { id: BusquedasFiltradasDto.id_User },
                estado_notificacion: BusquedasFiltradasDto.Estado_Notificacion
            },
            order: {
                fecha_notificacion: 'DESC'
            }
            });
    }
    else if(BusquedasFiltradasDto.id_User){
        return this.notificacionRepository.find({
            relations: {
                ClaseDepartamentoSubsidiaria:{
                    clase: true,
                    departamento: true,
                    subsidiaria: true
                }
            }
            
    });
    }
  }
}
