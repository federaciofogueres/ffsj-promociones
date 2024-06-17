import { Component } from '@angular/core';
import { Participante } from '../../models/participante.model';
import { ParticipantesComponent } from '../participantes/participantes.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ParticipantesComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  participantes: Participante[] = [];
  ganadores: Participante[] = [];
  showList = 'participantes';

  constructor() {

  }

  ngOnInit() {
    this.loadParticipantes();
    this.loadGanadores();
  }

  loadParticipantes() {
    this.participantes = [
      {
        dni: 'string',
        nombre: 'string',
        apellidos: 'string',
        email: 'string',
        telefono: 'string',
        entrada: 'string'
      },
      {
        dni: 'string',
        nombre: 'string',
        apellidos: 'string',
        email: 'string',
        telefono: 'string',
        entrada: 'string'
      }
    ];
  }

  loadGanadores() {
    this.ganadores = [
      {
        dni: 'ganador',
        nombre: 'ganador',
        apellidos: 'ganador',
        email: 'ganador',
        telefono: 'ganador',
        entrada: 'ganador'
      },
      {
        dni: 'ganador',
        nombre: 'ganador',
        apellidos: 'ganador',
        email: 'ganador',
        telefono: 'ganador',
        entrada: 'ganador'
      }
    ];
  }

}
