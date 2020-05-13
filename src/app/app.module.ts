import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNavComponent } from './page/layout/my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatGridListModule, MatCardModule,
  MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatInputModule, MatSelectModule, MatRadioModule, MatTreeModule,
  MatTooltipModule, MatCheckboxModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './page/home-page/home-page.component';
import { UsuarioClientService } from './service/usuario-client.service';
import { ParecerClientService } from './service/parecer-client.service';
import { ProcessoClientService } from './service/processo-client.service';
import { AdministrativoPageComponent } from './page/administrativo/administrativo-page/administrativo-page.component';
import { ProcessosPendentesPageComponent } from './page/parecer/processos-pendentes-page/processos-pendentes-page.component';
import { TriagemProcessosPageComponent } from './page/processo/triagem-processos-page/triagem-processos-page.component';
import { UsuarioPageComponent } from './page/administrativo/usuario-page/usuario-page.component';
import { ProcessoPageComponent } from './page/processo/processo-page/processo-page.component';
import { ParecerPageComponent } from './page/parecer/parecer-page/parecer-page.component';
import { ConfirmacaoPageComponent } from './page/dialogo/confirmacao-page/confirmacao-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListaParecerProcessoModalComponent } from './page/dialogo/lista-parecer-processo-modal/lista-parecer-processo-modal.component';
import { SelecionarUsuarioModalComponent } from './page/dialogo/selecionar-usuario-modal/selecionar-usuario-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErroModalComponent } from './page/dialogo/erro-modal/erro-modal.component';
import { MensagemModalComponent } from './page/dialogo/mensagem-modal/mensagem-modal.component';
import { LoginModalComponent } from './page/dialogo/login-modal/login-modal.component';
import { Interceptor } from './core/interceptor.module';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    AdministrativoPageComponent,
    ProcessosPendentesPageComponent,
    TriagemProcessosPageComponent,
    HomePageComponent,
    UsuarioPageComponent,
    ProcessoPageComponent,
    ParecerPageComponent,
    ConfirmacaoPageComponent,
    ListaParecerProcessoModalComponent,
    SelecionarUsuarioModalComponent,
    ErroModalComponent,
    MensagemModalComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    Interceptor,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTreeModule,
    DragDropModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatSnackBarModule,
  ],
  providers: [
    UsuarioClientService,
    ParecerClientService,
    ProcessoClientService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmacaoPageComponent,
    ListaParecerProcessoModalComponent,
    SelecionarUsuarioModalComponent,
    ErroModalComponent,
    MensagemModalComponent,
    LoginModalComponent
  ]
})
export class AppModule { }
