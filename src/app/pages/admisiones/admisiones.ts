import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Sección Admisiones: pasos del proceso, requisitos y calendario 2027-1. */
@Component({
  selector: 'app-admisiones',
  imports: [RouterLink],
  templateUrl: './admisiones.html',
})
export class Admisiones {
  /** Pasos del proceso de admisión. */
  readonly pasos = [
    { numero: 1, titulo: 'Inscripción', texto: 'Regístrate en el sistema SIGA y completa el formulario de aspirante.' },
    { numero: 2, titulo: 'Documentos', texto: 'Adjunta tu documento de identidad y el diploma o acta de grado.' },
    { numero: 3, titulo: 'Prueba de admisión', texto: 'Presenta la prueba en la fecha asignada según el programa elegido.' },
    { numero: 4, titulo: 'Confirmación de cupo', texto: 'Consulta los resultados y realiza el pago de matrícula para asegurar tu cupo.' },
  ];

  /** Requisitos generales de ingreso. */
  readonly requisitos = [
    'Documento de identidad vigente.',
    'Diploma de bachiller o acta de grado.',
    'Resultado de las pruebas de Estado (Saber 11).',
    'Fotografía reciente tipo documento.',
    'Formulario de inscripción diligenciado en el sistema SIGA.',
  ];

  /** Calendario del periodo 2027-1. */
  readonly calendario = [
    { etapa: 'Apertura de inscripciones', fecha: '01 de octubre de 2026' },
    { etapa: 'Cierre de inscripciones', fecha: '15 de noviembre de 2026' },
    { etapa: 'Prueba de admisión', fecha: '22 de noviembre de 2026' },
    { etapa: 'Publicación de resultados', fecha: '05 de diciembre de 2026' },
    { etapa: 'Pago de matrícula', fecha: '06 al 20 de diciembre de 2026' },
  ];
}
