import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Sección Registro Académico: trámites frecuentes y fechas clave. */
@Component({
  selector: 'app-registro-academico',
  imports: [RouterLink],
  templateUrl: './registro-academico.html',
})
export class RegistroAcademico {
  /** Trámites más consultados por los estudiantes. */
  readonly servicios = [
    { titulo: 'Matrícula de materias', texto: 'Inscribe tus asignaturas del periodo dentro de las fechas establecidas en el calendario académico.' },
    { titulo: 'Cancelación de materias', texto: 'Solicita la cancelación de una o varias asignaturas antes de la fecha límite del semestre.' },
    { titulo: 'Homologaciones', texto: 'Convalida materias cursadas en otra institución o programa presentando los soportes requeridos.' },
    { titulo: 'Certificados y constancias', texto: 'Solicita certificados de notas, de estudio o constancias de matrícula desde el sistema SIGA.' },
    { titulo: 'Reingreso', texto: 'Retoma tus estudios tras un periodo de inactividad actualizando tu situación académica.' },
    { titulo: 'Actualización de datos', texto: 'Mantén al día tu información personal y de contacto para recibir las notificaciones oficiales.' },
  ];

  /** Fechas clave del semestre. */
  readonly fechas = [
    { tramite: 'Matrícula de materias', periodo: '15 al 31 de enero de 2027' },
    { tramite: 'Ajuste de matrícula (adiciones)', periodo: '01 al 07 de febrero de 2027' },
    { tramite: 'Cancelación de materias', periodo: 'Hasta el 15 de abril de 2027' },
    { tramite: 'Solicitud de certificados', periodo: 'Todo el semestre' },
  ];
}
