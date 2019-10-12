import { CadastroComponent } from './cadastro/cadastro.component';
import { ListComponent } from './list/list.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'list', component: ListComponent},
  { path: 'editar/:id', component: CadastroComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
