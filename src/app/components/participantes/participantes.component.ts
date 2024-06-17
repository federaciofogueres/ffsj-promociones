import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Participante } from '../../models/participante.model';
import { ParticipanteCardComponent } from '../participante-card/participante-card.component';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss'
})
export class ParticipantesComponent {

  @Input()
  participantes: Participante[] = [];

  constructor(
    protected router: Router,
    private modalService: NgbModal
  ) {}

  open(participante: Participante) {
    const modalRef = this.modalService.open(ParticipanteCardComponent);
    modalRef.componentInstance.participante = participante;
  }
}
