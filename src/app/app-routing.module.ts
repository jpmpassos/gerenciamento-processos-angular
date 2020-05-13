import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AdministrativoPageComponent } from './page/administrativo/administrativo-page/administrativo-page.component';
import { TriagemProcessosPageComponent } from './page/processo/triagem-processos-page/triagem-processos-page.component';
import { ProcessosPendentesPageComponent } from './page/parecer/processos-pendentes-page/processos-pendentes-page.component';
import { UsuarioPageComponent } from './page/administrativo/usuario-page/usuario-page.component';
import { ProcessoPageComponent } from './page/processo/processo-page/processo-page.component';
import { ParecerPageComponent } from './page/parecer/parecer-page/parecer-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'administrativo', component: AdministrativoPageComponent },
  { path: 'triagemprocessos', component: TriagemProcessosPageComponent },
  { path: 'processospendentes', component: ProcessosPendentesPageComponent },
  { path: 'usuario', component: UsuarioPageComponent },
  { path: 'processo', component: ProcessoPageComponent },
  { path: 'parecer', component: ParecerPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
