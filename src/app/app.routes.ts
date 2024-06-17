import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ComprobadorComponent } from './components/comprobador/comprobador.component';
import { LoginComponent } from './components/login/login.component';
import { ParticipanteComponent } from './components/participante/participante.component';
import { SorteoComponent } from './components/sorteo/sorteo.component';
import { SorteosComponent } from './components/sorteos/sorteos.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'sorteos', component: SorteosComponent },
    { path: 'sorteos/:id', component: SorteoComponent },
    { path: 'participantes/:id', component: ParticipanteComponent },
    { path: 'ffsj-admin', component: LoginComponent },
    { path: 'comprobar-resultado', component: ComprobadorComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'sorteos/1' },
];