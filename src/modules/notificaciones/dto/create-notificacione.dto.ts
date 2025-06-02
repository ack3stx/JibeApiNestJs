export class CreateNotificacioneDto {
    id: number | null;
    Fecha_Creacion: Date;
    Fecha_Modificacion: Date;
    Estado: string;
    Descripcion: String;
    Usuario_Creacion: number;
    Usuario_Modificacion: number | null;
    clase_id: number | null;
}
