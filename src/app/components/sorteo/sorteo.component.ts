import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-sorteo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxExtendedPdfViewerModule
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

  pdfSrc: string = '/assets/documents/bases-sorteo.pdf';

  constructor(
    private fb: FormBuilder
  ) {}

  registrar() {
    this.registroForm.controls['dni'].setValue(this.registroForm.controls['dni'].value.toUpperCase());
    this.registroForm.controls['telefono'].setValue(this.registroForm.controls['telefono'].value.replace(/\s+/g, '').trim());
    console.log('Registrado -> ', this.registroForm.value);
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
