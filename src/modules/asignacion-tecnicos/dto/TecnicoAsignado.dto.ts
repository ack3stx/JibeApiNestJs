export class AsignacionTecnicosBatchDto {
    orden_trabajo_id: number;
    tecnicos: {
        tecnico_id: number;
        inicio_trabajo?: Date;
        fin_trabajo?: Date;
    }[];
}