import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessoModel } from '../../../model/processo-model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FuncoesUtis } from 'src/app/util/funcoes-utils';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ParecerModel } from '../../../model/parecer-model';
import { ListaParecerProcessoModalComponent } from '../../dialogo/lista-parecer-processo-modal/lista-parecer-processo-modal.component';
import { ParamUtil } from '../../../util/param-util';
import { MensagensSistema } from '../../../core/mensagens-sistema';
import { ProcessoClientService } from 'src/app/service/processo-client.service';
import { LoginUtil } from 'src/app/util/login-util';

@Component({
  selector: 'app-triagem-processos-page',
  templateUrl: './triagem-processos-page.component.html',
  styleUrls: ['./triagem-processos-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TriagemProcessosPageComponent extends MensagensSistema implements OnInit {

  processos: ProcessoModel[];
  processo: ProcessoModel | null;
  columnsToDisplay = ['opcoes', 'titulo', 'parecer'];

  screamTela: number = FuncoesUtis.documentHeight();

  constructor(
    private _processoClienteService: ProcessoClientService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    super(_dialog);
    this.validaTriador();
  }

  ngOnInit() {
    this.carregarProcessos();
  }

  editarProcesso(processo: ProcessoModel) {
    ParamUtil.setParam('processo', processo);
    this._router.navigate(['/processo']);
  }

  novoProduto() {
    this._router.navigate(['/processo']);
  }

  deletarProcesso(processo: ProcessoModel) {
    this.showMensagemConfirmacao("Confirma excluir o processo '" + processo.titulo + "' com todas suas deppenências?").then(r => {
      if (r) {
        this._processoClienteService.deletar(processo).subscribe(
          () => {
            this.showMensagem('Sucesso', 'Peocesso excluido com sucesso!');
            this.carregarProcessos();
          },
          e => {
            this.showMensagemErro(e);
            this.carregarProcessos();
          }
        );
      }
    });
  }

  openListaParecerModal(processo: ProcessoModel) {

    let wModal = 650;
    let hModal = 450;

    if (FuncoesUtis.documentWidth() <= 660) {
      wModal = FuncoesUtis.documentWidth() - 10;
      hModal = FuncoesUtis.documentHeight() - 10;
    }

    ParamUtil.setParam('screamTela', hModal);

    ParamUtil.setParam('processo', processo);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = wModal.toString() + 'px';
    dialogConfig.height = hModal.toString() + 'px';

    dialogConfig.data = new ParecerModel();

    const dialogRef = this.dialog.open(ListaParecerProcessoModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {

      });
  }

  carregarProcessos() {
    this._processoClienteService.listarTodos().subscribe(
      l => this.processos = l,
      e => this.showMensagemErro(e));
  }

  validaTriador() {
    if (!LoginUtil.isTriador()) {
      this._router.navigate(['/home']);
      this.showMensagem('Opa', 'Usuário deve ser triador para acessar essa página!');
    }
  }

}
