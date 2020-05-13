import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FuncoesUtis } from '../../../util/funcoes-utils';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { LoginUtil } from 'src/app/util/login-util';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../../dialogo/login-modal/login-modal.component';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss']
})
export class MyNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(
    private _router: Router,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) { }

  acaoSidenavResponsive(drawer: any, path: string) {
    if (isNullOrUndefined(LoginUtil.getUsuarioLogado())) {
      this.showLogin().then(r => {
        if (!isNullOrUndefined(LoginUtil.getUsuarioLogado())) {
          this._router.navigate([path]);
        }
      });
    } else {
      this._router.navigate([path]);
    }

    if (FuncoesUtis.documentWidth() <= 960) {
      drawer.toggle();
    }
  }

  isLogado() {
    return LoginUtil.isLogado();
  }

  logout() {
    LoginUtil.limparAutenticacao();
    this._router.navigate(['/home']);
  }

  showLogin(): Promise<Boolean> {

    return new Promise<Boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(LoginModalComponent, null);

      dialogRef.afterClosed().subscribe(r => {
        resolve(true);
      });
    });
  }

  getNomeUsuarioLogado() {
    if (LoginUtil.isLogado()) {
      return " (" + LoginUtil.getUsuarioLogado().nome + ")"
    }
    return "";
  }
}
