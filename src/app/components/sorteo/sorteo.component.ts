import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Sorteo } from '../../../external-api/sorteo';
import { CensoService } from '../../services/censo.service';
import { FooterComponent } from '../footer/footer.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-sorteo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxExtendedPdfViewerModule,
    FooterComponent,
    SpinnerComponent
  ],
  templateUrl: './sorteo.component.html',
  styleUrl: './sorteo.component.scss'
})
export class SorteoComponent {
  registroForm: FormGroup = this.fb.group({
    dni: ['', [Validators.required, this.dniValidator]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    instagram: ['', Validators.required],
    aceptoCondiciones: [false, Validators.requiredTrue]
  });

  dniTouched = false;
  emailTouched = false;
  telefonoTouched = false;
  instagramTouched = false;

  condicionesAceptadas = false;
  showConditions = false;
  condicionesMostradas = false;

  // Añade estas dos variables al inicio de tu componente
  showSuccessAlert = false;
  showErrorAlert = false;
  errorMessage = '';

  loading = false;

  pdfSrc: string = '/assets/documents/bases-sorteo.pdf';

  constructor(
    private fb: FormBuilder,
    private censoService: CensoService
  ) {}

  registrar() {
    this.loading = true;
    let sorteo: Sorteo = {};
    this.censoService.sorteosPost(this.rellenaDatos(sorteo)).subscribe({
      next: data => {
        console.log('Sorteo registrado -> ', data);
        this.loading = false;
        this.showSuccessAlert = true; // Muestra la alerta de éxito
        setTimeout(() => this.showSuccessAlert = false, 5000); // Oculta la alerta de éxito después de 5 segundos
      },
      error: error => {
        console.error('Error al registrar sorteo -> ', error.error?.status?.message);
        this.loading = false;
        this.showErrorAlert = true;
        this.errorMessage = error.error?.status?.message; // Guarda el mensaje de error
        setTimeout(() => this.showErrorAlert = false, 10000); // Oculta la alerta de éxito después de 5 segundos
      }
    });
    console.log('Registrado -> ', this.registroForm.value);
    this.reset();
  }

  rellenaDatos(sorteo: Sorteo) {
    sorteo.dni = this.registroForm.controls['dni'].value.toUpperCase();
    sorteo.telefono = this.registroForm.controls['telefono'].value.replace(/\s+/g, '').trim();
    sorteo.email = this.registroForm.controls['email'].value;
    sorteo.instagram = this.registroForm.controls['instagram'].value;
    return sorteo;
  }

  reset() {
    this.condicionesAceptadas = false;
    this.showConditions = false;
    this.registroForm.reset();
    this.dniTouched = false;
    this.emailTouched = false;
    this.telefonoTouched = false;
    this.instagramTouched = false;
    this.showSuccessAlert = false; // Oculta la alerta de éxito
    this.showErrorAlert = false; // Oculta la alerta de error
  }

  limpiar() {
    this.registroForm.reset();
  }
  
  dniValidator(control: AbstractControl): { [key: string]: any } | null {
    const dni = control.value;
    const re = /^[0-9]{8}[A-Za-z]$/;
    if (!re.test(dni)) {
      return { 'invalidDni': true };
    }
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const numbers = dni.slice(0, 8);
    const expectedLetter = letters[numbers % 23];
    const letter = dni.slice(8);
    return expectedLetter === letter.toUpperCase() ? null : { 'invalidDni': true };
  }

  logForm() {
    console.log(this.registroForm);
  }

  showCondiciones() {
    console.log('Condiciones aceptadas -> ', this.condicionesAceptadas);
    this.condicionesMostradas = true;
    this.showConditions = true;
  }

  hideCondiciones() { 
    this.showConditions = false;
  }

  aceptarCondiciones() {
    this.condicionesAceptadas = !this.condicionesAceptadas;
    this.registroForm.controls['aceptoCondiciones'].setValue(this.condicionesAceptadas);
  }

}
