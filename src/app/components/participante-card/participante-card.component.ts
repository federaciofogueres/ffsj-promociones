import { Component, Input } from '@angular/core';
import { Participante } from '../../models/participante.model';

@Component({
  selector: 'app-participante-card',
  standalone: true,
  imports: [],
  templateUrl: './participante-card.component.html',
  styleUrl: './participante-card.component.scss'
})
export class ParticipanteCardComponent {
  @Input() participante!: Participante;

  constructor() { }

  sendEmail() {
    console.log('Sending email to ' + this.participante.email);
    
  }
}
