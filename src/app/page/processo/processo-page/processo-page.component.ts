import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ParamUtil } from 'src/app/util/param-util';
import { ProcessoClientService } from 'src/app/service/processo-client.service';
import { ProcessoModel } from 'src/app/model/processo-model';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';
import { LoginUtil } from 'src/app/util/login-util';

@Component({
  selector: 'app-processo-page',
  templateUrl: './processo-page.component.html',
  styleUrls: ['./processo-page.component.scss']
})
export class ProcessoPageComponent extends MensagensSistema implements OnInit {

  processoForm: FormGroup;
  edicao = true;
  processo: ProcessoModel;

  constructor(
    private fb: FormBuilder,
    private _processoClienteService: ProcessoClientService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    super(_dialog);

    this.validaTriador();

    this.processo = ParamUtil.getParam('processo');

    this.edicao = this.processo !== null;
  }

  ngOnInit() {
    this.processoForm = this.fb.group({
      titulo: [null, Validators.required],
      descricao: [null]
    });

    this.iniciarProcesso();
  }


  iniciarProcesso() {
    if (this.edicao) {
      this._processoClienteService.carregar(this.processo.processoId).subscribe(
        p => {
          this.processo = p;
          this.processoForm.get('titulo').setValue(this.processo.titulo);
          this.processoForm.get('descricao').setValue(this.processo.descricao);
        },
        e => {
          this.showMensagemErro(e);
          this._router.navigate(['/triagemprocessos']);
        });
    }
  }

  salvar() {
    const processoTemp = this.processoForm.getRawValue();

    this.preencherProcesso(processoTemp);

    if (this.edicao) {
      this._processoClienteService.atualizar(this.processo).subscribe(
        p => {
          this.processo = p;
          this.showMensagem('Sucesso', 'Processo foi atualizado com sucesso!');
          this._router.navigate(['/triagemprocessos']);
        },
        e => this.showMensagemErro(e)
      );
    } else {
      this._processoClienteService.salvar(this.processo).subscribe(
        p => {
          this.showMensagem('Sucesso', 'Processo foi criado com sucesso!');
          this._router.navigate(['/triagemprocessos']);
        },
        e => this.showMensagemErro(e)
      );
    }
  }

  preencherProcesso(processoTemp) {
    if (isNullOrUndefined(this.processo)) {
      this.processo = new ProcessoModel();
    }

    this.processo.descricao = processoTemp.descricao;
    this.processo.titulo = processoTemp.titulo;
  }

  validaTriador() {
    if (!LoginUtil.isTriador()) {
      this._router.navigate(['/home']);
      this.showMensagem('Opa', 'Usuário deve ser triador para acessar essa página!');
    }
  }
}
