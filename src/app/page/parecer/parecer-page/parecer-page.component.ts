import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParecerModel } from 'src/app/model/parecer-model';
import { ParamUtil } from 'src/app/util/param-util';
import { StatusParecerEnum } from 'src/app/enums/status-parecer.enum';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ParecerClientService } from 'src/app/service/parecer-client.service';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { isNullOrUndefined } from 'util';
import { LoginUtil } from 'src/app/util/login-util';

@Component({
  selector: 'app-parecer-page',
  templateUrl: './parecer-page.component.html',
  styleUrls: ['./parecer-page.component.scss']
})
export class ParecerPageComponent extends MensagensSistema implements OnInit {

  parecerForm: FormGroup;

  parecer: ParecerModel;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _parecerClienteService: ParecerClientService
  ) {
    super(_dialog);

    this.validaFinalizador();

    this.parecer = ParamUtil.getParam('parecer');

    if (this.parecer === null) {
      this._router.navigate(['/processospendentes']);
    }
  }

  ngOnInit() {
    this.parecerForm = this._fb.group({
      descricao: [null, Validators.required],
      status: [StatusParecerEnum.APROVADO, Validators.required]
    });    
  }

  salvar() {
    const usuarioTemp: ParecerModel = this.parecerForm.getRawValue();

    this.preencherUsuario(usuarioTemp);

    this._parecerClienteService.atualizar(this.parecer).subscribe(u => {
      this.showMensagem('Sucesso', 'Parecer foi atualizado com sucesso!');
      this._router.navigate(['/processospendentes']);
    }, e => this.showMensagemErro(e));
  }

  preencherUsuario(parecerTemp) {
    this.parecer.descricao = parecerTemp.descricao;
    this.parecer.status = parecerTemp.status;
  }

  validaFinalizador() {
    if (!LoginUtil.isFinalizador()) {
      this._router.navigate(['/home']);
      this.showMensagem('Opa', 'Usuário deve ser finalizador para acessar essa página!');
    }
  }

}
