import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ParticipanteCardComponent } from './components/participante-card/participante-card.component';
import { SorteoComponent } from './components/sorteo/sorteo.component';
import { SorteosComponent } from './components/sorteos/sorteos.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'sorteos', component: SorteosComponent },
    { path: 'sorteos/:id', component: SorteoComponent },
    { path: 'participantes/:id', component: ParticipanteCardComponent, canActivate: [AuthGuard]},
    { path: 'ffsj-admin', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'sorteos/1'},
];