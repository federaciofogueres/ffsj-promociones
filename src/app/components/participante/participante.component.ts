import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ConfirmacionGanador } from '../../../external-api/confirmacionGanador';
import { ResponseStatus } from '../../../external-api/responseStatus';
import { Participante } from '../../models/participante.model';
import { CensoService } from '../../services/censo.service';
import { ValidatorsService } from '../../services/validators.service';
import { AlertService } from '../alert/alert.service';
import { FooterComponent } from '../footer/footer.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-participante',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxExtendedPdfViewerModule,
    FooterComponent,
    SpinnerComponent
  ],
  templateUrl: './participante.component.html',
  styleUrl: './participante.component.scss'
})
export class ParticipanteComponent {

  registroForm: FormGroup = this.fb.group({
    dni: ['', [Validators.required, this.validatorsService.dniValidator]]
  });

  dniTouched = false;

  loading: boolean = false;
  entrada!: string;
  participante!: Participante;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private censoService: CensoService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loadEntrada();
  }

  loadEntrada() {
    this.entrada = this.route.snapshot.paramMap.get('id')!;
    this.loading = false;
  }

  procesarAccion(accion: number) {
    let messageConfirm = accion === 1 ? 'confirmar' : 'rechazar';
    const confirmacion = window.confirm('¡Atención! estás a punto de ' + messageConfirm + ' tu entrada, ¿estás seguro?');
    if (confirmacion) {
      this.loading = true;
      let body: ConfirmacionGanador = {
        dni: this.registroForm.value.dni,
        idTipoEstado: accion
      }
      this.censoService.ganadoresUpdate(body, Number(this.entrada)).subscribe({
        next: (response: ResponseStatus) => {
          console.log(response);
          if (accion === 1) {
            this.alertService.success('Entrada confirmada correctamente', 5000);
          } else if (accion === 3) {
            this.alertService.success('Entrada rechazada correctamente', 5000);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

}
