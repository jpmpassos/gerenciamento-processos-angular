import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioClientService } from 'src/app/service/usuario-client.service';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { ParamUtil } from 'src/app/util/param-util';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { sync } from 'glob';
import { MatDialog } from '@angular/material';
import { ErroModalComponent } from '../../dialogo/erro-modal/erro-modal.component';
import { MensagensSistema } from '../../../core/mensagens-sistema';
import { isNullOrUndefined } from 'util';
import { LoginUtil } from 'src/app/util/login-util';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: ['./usuario-page.component.scss']
})
export class UsuarioPageComponent extends MensagensSistema implements OnInit {

  usuarioForm: FormGroup;
  edicao: boolean = true;
  usuario: UsuarioModel;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _usuarioClientService: UsuarioClientService,
    public _dialog: MatDialog
  ) {
    super(_dialog);

    this.validaAdministrado();

    this.usuario = ParamUtil.getParam("usuario");

    this.edicao = this.usuario && this.usuario !== null;
  }

  ngOnInit() {
    let autenficacaoF: any;

    if (this.edicao) {
      autenficacaoF = [null];
    } else {
      autenficacaoF = [null, Validators.required];
    }

    this.usuarioForm = this._fb.group({
      nome: [null, Validators.required],
      admin: [false, Validators.required],
      triador: [false, Validators.required],
      finalizador: [false, Validators.required],
      login: autenficacaoF,
      senha: autenficacaoF,
      senhaConfirmacao: autenficacaoF
    }, {
        validator: this.confirmarSenhas('senha', 'senhaConfirmacao')
      });

    if (this.edicao) {
      this._usuarioClientService.carregar(this.usuario.usuarioId).subscribe(u => {
        this.usuario = u;
        this.usuarioForm.get('nome').setValue(this.usuario.nome);
        this.usuarioForm.get('admin').setValue(this.usuario.admin);
        this.usuarioForm.get('finalizador').setValue(this.usuario.finalizador);
        this.usuarioForm.get('login').setValue(this.usuario.login);
        this.usuarioForm.get('senha').setValue(this.usuario.senha);
        this.usuarioForm.get('triador').setValue(this.usuario.triador);
      }, e => {
        this.showMensagemErro(e);
        this._router.navigate(['/administrativo']);
      });
    }
  }

  salvar() {
    const usuarioTemp: UsuarioModel = this.usuarioForm.getRawValue();

    this.preencherUsuario(usuarioTemp);

    if (this.edicao) {
      this._usuarioClientService.atualizar(this.usuario).subscribe(u => {
        this.showMensagem('Sucesso', 'Usuário foi atualizado com sucesso!');
        this._router.navigate(['/administrativo']);
      }, e => this.showMensagemErro(e));
    } else {
      this._usuarioClientService.salvar(this.usuario).subscribe(u => {
        this.showMensagem('Sucesso', 'Usuário foi criado com sucesso!');
        this._router.navigate(['/administrativo']);
      }, e => this.showMensagemErro(e));
    }
  }

  preencherUsuario(usuarioTemp) {
    if (isNullOrUndefined(this.usuario)) {
      this.usuario = new UsuarioModel();
    }

    if (!this.edicao) {
      this.usuario.login = usuarioTemp.login;
      this.usuario.senha = usuarioTemp.senha;
    }

    this.usuario.admin = usuarioTemp.admin;
    this.usuario.finalizador = usuarioTemp.finalizador;
    this.usuario.triador = usuarioTemp.triador;
    this.usuario.nome = usuarioTemp.nome;
  }

  confirmarSenhas(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (this.edicao) {
        matchingControl.setErrors(null);
      } else if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  validaAdministrado() {
    if (!LoginUtil.isAdmin()) {
      this._router.navigate(['/home']);
      this.showMensagem('Opa', 'Usuário deve ser administrado para acessar essa página!');
    }
  }

}
