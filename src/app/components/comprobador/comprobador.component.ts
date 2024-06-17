import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ResponseStatus } from '../../../external-api/responseStatus';
import { CensoService } from '../../services/censo.service';
import { ValidatorsService } from '../../services/validators.service';
import { FooterComponent } from '../footer/footer.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-comprobador',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxExtendedPdfViewerModule,
    FooterComponent,
    SpinnerComponent
  ],
  templateUrl: './comprobador.component.html',
  styleUrl: './comprobador.component.scss'
})
export class ComprobadorComponent {

  registroForm: FormGroup = this.fb.group({
    dni: ['', [Validators.required, this.validatorsService.dniValidator]]
  });

  dniTouched = false;
  loading: boolean = false;

  ganador: boolean = false;
  showMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private censoService: CensoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  comprobar() {
    this.loading = true;
    this.censoService.ganadorSearch(this.registroForm.value.dni).subscribe({
      next: (response: ResponseStatus) => {
        this.ganador = response.status.status === 200;
        this.showMessage = true;
        this.loading = false;
      },
      error: (error) => {
        this.ganador = false;
        this.showMessage = true;
        this.loading = false;
        console.error(error);
      }
    });
  }

}
