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
  reservas: Participante[] = [];
  showList = 'participantes';

  constructor() {

  }

  ngOnInit() {
    this.loadParticipantes();
    // this.loadGanadores();
  }

  loadParticipantes() {
    this.participantes = Array.from({ length: 10 }, (_, i) => ({
      dni: Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
      nombre: `Nombre${i + 1}`,
      apellidos: `Apellidos${i + 1}`,
      email: `email${i + 1}@example.com`,
      telefono: Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
      entrada: (i + 1).toString().padStart(5, '0')
    }));
  }

  sortearParticipantes() {
    // Desordenar el array de participantes
    this.participantes.sort(() => Math.random() - 0.5);
  
    // Agregar los participantes al array de ganadores uno por uno
    this.participantes.forEach((participante, index) => {
      setTimeout(() => {
        if (index < 5) {
          this.ganadores.push(participante);
        } else {
          this.reservas.push(participante);
        }
      }, index * 500); // Agregar un participante cada segundo
    });
  }

}
