import { Routes } from '@angular/router';
import { SorteoComponent } from './components/sorteo/sorteo.component';
import { SorteosComponent } from './components/sorteos/sorteos.component';

export const routes: Routes = [
    { path: 'sorteos', component: SorteosComponent },
    { path: 'sorteos/:id', component: SorteoComponent },
    { path: '**', redirectTo: 'sorteos/1'},
];