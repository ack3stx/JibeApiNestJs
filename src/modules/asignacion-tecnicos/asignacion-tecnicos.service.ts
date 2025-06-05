import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { asignacion_tecnicos } from './entities/Asignacion_Tecnicos.entity';
import { AsignacionTecnicosBatchDto } from './dto/TecnicoAsignado.dto';
import { Not } from 'typeorm';

@Injectable()
export class AsignacionTecnicosService {

    constructor(
        @InjectRepository(asignacion_tecnicos)
        private readonly asignacionTecnicosRepository: Repository<asignacion_tecnicos>
     ) {};

     async procesarAsignacionesTecnicos(data: AsignacionTecnicosBatchDto): Promise<asignacion_tecnicos[]> {
    const resultados: asignacion_tecnicos[] = [];

    for (const tecnicoData of data.tecnicos) {
        const asignacionSinCompletar = await this.asignacionTecnicosRepository.findOne({
            where: {
                orden_trabajo: { id: data.orden_trabajo_id },
                tecnicos: { id: tecnicoData.tecnico_id },
                inicio_trabajo: IsNull(),
                fin_trabajo: IsNull()
            },
            relations: ['orden_trabajo', 'tecnicos']
        });

        console.log('Asignación sin completar encontrada:', asignacionSinCompletar);

        if (asignacionSinCompletar) {
            asignacionSinCompletar.inicio_trabajo = tecnicoData.inicio_trabajo as Date;
            asignacionSinCompletar.fin_trabajo = tecnicoData.fin_trabajo as Date;
            
            const actualizado = await this.asignacionTecnicosRepository.save(asignacionSinCompletar);
            resultados.push(actualizado);
        } else {
            
            const nuevaAsignacion = new asignacion_tecnicos();
            nuevaAsignacion.orden_trabajo = { id: data.orden_trabajo_id } as any;
            nuevaAsignacion.tecnicos = { id: tecnicoData.tecnico_id } as any;
            nuevaAsignacion.inicio_trabajo = tecnicoData.inicio_trabajo as Date;
            nuevaAsignacion.fin_trabajo = tecnicoData.fin_trabajo as Date;
            
            const creado = await this.asignacionTecnicosRepository.save(nuevaAsignacion);
            resultados.push(creado);
        }
    }

    return resultados;
}

    async findByOrdenTrabajo(ordenTrabajoId: number): Promise<any[]> {
    const asignaciones = await this.asignacionTecnicosRepository.find({
        where: {
            orden_trabajo: { id: ordenTrabajoId },
            inicio_trabajo: Not(IsNull()),
            fin_trabajo: Not(IsNull())
        },
        relations: ['tecnicos'],
        order: {
            inicio_trabajo: 'ASC'
        }
    });

    return asignaciones.map(asignacion => {
        const inicio = new Date(asignacion.inicio_trabajo);
        const fin = new Date(asignacion.fin_trabajo);
        const horasTrabajadas = Math.round((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60) * 100) / 100;

        return {
            id: asignacion.id,
            tecnico: {
                id: asignacion.tecnicos.id,
                nombre: asignacion.tecnicos.nombre
            },
            fecha_trabajo: inicio.toISOString().split('T')[0],
            inicio_trabajo: asignacion.inicio_trabajo,
            fin_trabajo: asignacion.fin_trabajo,
            horas_trabajadas: horasTrabajadas
        };
    });
}
}
