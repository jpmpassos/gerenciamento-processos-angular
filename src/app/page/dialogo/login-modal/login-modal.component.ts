import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioClientService } from 'src/app/service/usuario-client.service';
import { MensagensSistema } from 'src/app/core/mensagens-sistema';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent extends MensagensSistema implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) m: any,
    private _usuarioClientService: UsuarioClientService,
    public _dialog: MatDialog
  ) {
    super(_dialog);
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  close() {
    this._dialogRef.close();
  }

  logar() {
    const auth = this.loginForm.getRawValue();
    this._usuarioClientService.autenticar(auth.login, auth.senha).subscribe(
      u => {
        if (!isNullOrUndefined(u)) {
          this.gravarAutenticacao(u);
          this.close();
        } else {
          this.showMensagem('Opa', 'Login ou Senha estão incorretos!');
        }
      },
      e => this.showMensagemErro(e)
    );
  }

  gravarAutenticacao(usuario: UsuarioModel) {
    sessionStorage.setItem('Usuario', JSON.stringify(usuario));
    sessionStorage.setItem('Authorization', btoa(usuario.login + ':' + usuario.senha));
  }
}
