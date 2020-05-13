import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../../model/usuario-model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { ConfirmacaoPageComponent } from '../../dialogo/confirmacao-page/confirmacao-page.component';
import { FuncoesUtis } from 'src/app/util/funcoes-utils';
import { UsuarioClientService } from 'src/app/service/usuario-client.service';
import { ParamUtil } from 'src/app/util/param-util';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { LoginUtil } from 'src/app/util/login-util';

@Component({
  selector: 'app-administrativo-page',
  templateUrl: './administrativo-page.component.html',
  styleUrls: ['./administrativo-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdministrativoPageComponent extends MensagensSistema implements OnInit {

  usuarios: UsuarioModel[];
  usuario: UsuarioModel | null;
  columnsToDisplay = ['opcoes', 'nome'];

  screamTela: number = FuncoesUtis.documentHeight();

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    private _usuarioClientService: UsuarioClientService
  ) {
    super(_dialog);
    this.validaAdministrado();
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  editarUsuario(usuario: UsuarioModel) {
    ParamUtil.setParam("usuario", usuario);
    this._router.navigate(['/usuario']);
  }

  novoProduto() {
    this._router.navigate(['/usuario']);
  }

  deletarUsuario(usuario: UsuarioModel) {
    this.showMensagemConfirmacao("Confirma excluir o usuário '" + usuario.nome + "'?").then(r => {
      if (r) {
        this._usuarioClientService.deletar(usuario).subscribe(
          () => {
            this.showMensagem('Sucesso', 'Usuário excluido com sucesso!');
            this.carregarUsuarios();
          },
          e => {
            this.showMensagemErro(e);
            this.carregarUsuarios();
          }
        );
      }
    });

  }

  carregarUsuarios() {
    this._usuarioClientService.listarTodos().subscribe(l => {
      this.usuarios = l;
    });
  }

  validaAdministrado() {
    if (!LoginUtil.isAdmin()) {
      this._router.navigate(['/home']);
      this.showMensagem('Opa', 'Usuário deve ser administrado para acessar essa página!');
    }
  }
}
