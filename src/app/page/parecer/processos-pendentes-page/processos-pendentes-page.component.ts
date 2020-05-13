import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FuncoesUtis } from 'src/app/util/funcoes-utils';
import { MatDialog } from '@angular/material';
import { ParecerModel } from '../../../model/parecer-model';
import { StatusParecerEnum } from 'src/app/enums/status-parecer.enum';
import { ParamUtil } from 'src/app/util/param-util';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { ParecerClientService } from 'src/app/service/parecer-client.service';
import { LoginUtil } from 'src/app/util/login-util';

@Component({
  selector: 'app-processos-pendentes-page',
  templateUrl: './processos-pendentes-page.component.html',
  styleUrls: ['./processos-pendentes-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProcessosPendentesPageComponent extends MensagensSistema implements OnInit {

  pareceres: ParecerModel[];
  parecer: ParecerModel | null;
  columnsToDisplay = ['opcoes', 'titulo', 'status'];

  screamTela: number = FuncoesUtis.documentHeight();

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _parecerClienteService: ParecerClientService
  ) {
    super(_dialog);
    this.validaFinalizador();
  }

  ngOnInit() {
    this.carregarPareceresPendentes();
  }

  editarParecer(parecer: ParecerModel) {
    ParamUtil.setParam('parecer', parecer);
    this._router.navigate(['/parecer']);
  }

  carregarPareceresPendentes() {
    this._parecerClienteService.listarPendentePorUsuario(LoginUtil.getUsuarioLogado().usuarioId).subscribe(
      l => this.pareceres = l,
      e => this.showMensagemErro(e)
    );
  }

  validaFinalizador() {
    if (!LoginUtil.isFinalizador()) {
      this._router.navigate(['/home']);
      this.showMensagem('Opa', 'Usuário deve ser finalizador para acessar essa página!');
    }
  }
}
