import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParecerModel } from '../../../model/parecer-model';
import { ProcessoModel } from '../../../model/processo-model';
import { ParamUtil } from '../../../util/param-util';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { FuncoesUtis } from 'src/app/util/funcoes-utils';
import { SelecionarUsuarioModalComponent } from '../selecionar-usuario-modal/selecionar-usuario-modal.component';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { ParecerClientService } from 'src/app/service/parecer-client.service';

@Component({
  selector: 'app-lista-parecer-processo-modal',
  templateUrl: './lista-parecer-processo-modal.component.html',
  styleUrls: ['./lista-parecer-processo-modal.component.scss']
})
export class ListaParecerProcessoModalComponent extends MensagensSistema implements OnInit {

  pareceres: ParecerModel[];
  processo: ProcessoModel;
  screamTela: number;

  constructor(
    private _dialogRef: MatDialogRef<ListaParecerProcessoModalComponent>,
    @Inject(MAT_DIALOG_DATA) p: ParecerModel,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _parecerClientService: ParecerClientService
  ) {
    super(_dialog)
    this.processo = ParamUtil.getParam('processo');
    this.screamTela = ParamUtil.getParam('screamTela');
  }

  ngOnInit() {
    this.carregarParecer();
  }

  selecionarParecer(parecer: ParecerModel) {

  }

  editarParecer(parecer: ParecerModel) {
    console.log('The snack-bar was dismissed');
    this._snackBar.open("Edição não foi implementada!", "Erro", {
      duration: 2000,
    });

  }

  deletarParecer(parecer: ParecerModel) {
    this.showMensagemConfirmacao("Confirma excluir o parecer do usuário '" + parecer.usuario.nome + "'?")
      .then(r => {
        if (r) {
          this._parecerClientService.deletar(parecer).subscribe(
            () => {
              this.showMensagem('Sucesso', 'Parecer excluido com sucesso!');
              this.carregarParecer();
            },
            e => this.showMensagemErro(e));
        }
      });
  }

  openSelecionarUsuarioModal() {
    let wModal = 650;
    let hModal = 450;

    if (FuncoesUtis.documentWidth() <= 660) {
      wModal = FuncoesUtis.documentWidth() - 10;
      hModal = FuncoesUtis.documentHeight() - 10;
    }

    ParamUtil.setParam('screamTela', hModal);

    ParamUtil.setParam('processo', this.processo);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = wModal.toString() + 'px';
    dialogConfig.height = hModal.toString() + 'px';

    dialogConfig.data = new ParecerModel();

    const dialogRef = this.dialog.open(SelecionarUsuarioModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {
        this.carregarParecer();
      });
  }

  carregarParecer() {
    this._parecerClientService.listarPorProcesso(this.processo.processoId).subscribe(
      l => this.pareceres = l,
      e => this.showMensagemErro(e)
    );
  }

  close() {
    this._dialogRef.close();
  }
}
