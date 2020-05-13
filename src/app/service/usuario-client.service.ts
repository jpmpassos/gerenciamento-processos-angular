import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../model/usuario-model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioClientService {

  constructor(private httpClient: HttpClient) { }

  listarTodos() {
    return this.httpClient.get<UsuarioModel[]>(environment.endpoint.USUARIO);
  }

  listarFinalizadores() {
    return this.httpClient.get<UsuarioModel[]>(environment.endpoint.USUARIO_FINALIZADOR);
  }

  carregar(id: number) {
    return this.httpClient.get<UsuarioModel>(environment.endpoint.USUARIO + "/" + id.toString());
  }

  salvar(usuario: UsuarioModel) {
    return this.httpClient.post(environment.endpoint.USUARIO, usuario,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  atualizar(usuario: UsuarioModel) {
    return this.httpClient.put(environment.endpoint.USUARIO + "/" + usuario.usuarioId.toString(), usuario,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deletar(usuario: UsuarioModel) {
    return this.httpClient.delete(environment.endpoint.USUARIO + "/" + usuario.usuarioId.toString());
  }

  autenticar(login: string, senha: string) {
    let p = new HttpParams();

    p = p.append('login', login);
    p = p.append('senha', senha);

    return this.httpClient.get<UsuarioModel>(environment.endpoint.USUARIO_AUTHENTICATION,
      { params: p });
  }
}
