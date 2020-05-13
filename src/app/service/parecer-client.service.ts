import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ParecerModel } from '../model/parecer-model';


@Injectable({
  providedIn: 'root'
})
export class ParecerClientService {

  constructor(private httpClient: HttpClient) { }

  listarTodos() {
    return this.httpClient.get<ParecerModel[]>(environment.endpoint.PARECER);
  }

  listarPorProcesso(processoId: number) {
    let p = new HttpParams();

    p = p.append('processoId', processoId.toString());

    return this.httpClient.get<ParecerModel[]>(environment.endpoint.PARECER_POR_PROCESSO, { params: p });
  }

  listarPendentePorUsuario(usuarioId: number) {
    let p = new HttpParams();

    p = p.append('usuarioId', usuarioId.toString());

    return this.httpClient.get<ParecerModel[]>(environment.endpoint.PARECER_PENDENTE_POR_USUARIO, { params: p });
  }

  carregar(id: number) {
    return this.httpClient.get<ParecerModel>(environment.endpoint.PARECER + "/" + id.toString());
  }

  salvar(parecer: ParecerModel) {
    return this.httpClient.post(environment.endpoint.PARECER, parecer,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  atualizar(parecer: ParecerModel) {
    return this.httpClient.put(environment.endpoint.PARECER + "/" + parecer.parecerId.toString(), parecer,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deletar(parecer: ParecerModel) {
    return this.httpClient.delete(environment.endpoint.PARECER + "/" + parecer.parecerId.toString());
  }

}
