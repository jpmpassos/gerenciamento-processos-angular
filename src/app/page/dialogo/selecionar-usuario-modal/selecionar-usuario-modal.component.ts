import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProcessoModel } from '../../../model/processo-model';
import { ParamUtil } from '../../../util/param-util';
import { UsuarioModel } from '../../../model/usuario-model';
import { UsuarioClientService } from 'src/app/service/usuario-client.service';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { ParecerClientService } from 'src/app/service/parecer-client.service';
import { ParecerModel } from 'src/app/model/parecer-model';
import { StatusParecerEnum } from 'src/app/enums/status-parecer.enum';

@Component({
  selector: 'app-selecionar-usuario-modal',
  templateUrl: './selecionar-usuario-modal.component.html',
  styleUrls: ['./selecionar-usuario-modal.component.scss']
})
export class SelecionarUsuarioModalComponent extends MensagensSistema implements OnInit {

  usuarios: UsuarioModel[];
  processo: ProcessoModel;
  screamTela: number;

  columnsDisplay = ['opcoes', 'nome'];

  constructor(
    private dialogRef: MatDialogRef<SelecionarUsuarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) u: UsuarioModel,
    private _dialog: MatDialog,
    private _usuarioClienteService: UsuarioClientService,
    private _parecerClienteService: ParecerClientService
  ) {
    super(_dialog);
    this.processo = ParamUtil.getParam('processo');
    this.screamTela = ParamUtil.getParam('screamTela');
  }

  ngOnInit() {
    this.carregarUsuariosFinalizadores();
  }

  selecionarUsuario(usuario: UsuarioModel) {
    const parecer = new ParecerModel();
    parecer.processo = this.processo;
    parecer.usuario = usuario;
    parecer.status = StatusParecerEnum.PENDENTE;
    
    this._parecerClienteService.salvar(parecer).subscribe(
      p => {
        this.showMensagem('Suceso', 'Parecer criado com sucesso!');
        this.close();
      },
      e => this.showMensagemErro(e));
  }

  carregarUsuariosFinalizadores() {
    this._usuarioClienteService.listarFinalizadores().subscribe(
      l => this.usuarios = l,
      e => this.showMensagemErro(e)
    );
  }

  close() {
    this.dialogRef.close();
  }
}
