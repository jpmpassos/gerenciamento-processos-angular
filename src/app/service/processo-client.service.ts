import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProcessoModel } from '../model/processo-model';


@Injectable({
  providedIn: 'root'
})
export class ProcessoClientService {

  constructor(private httpClient: HttpClient) { }

  listarTodos() {
    return this.httpClient.get<ProcessoModel[]>(environment.endpoint.PROCESSO);
  }

  listarPendenteAprovacao(processoId : number) {
    let p = new HttpParams();

    p = p.append('processoId', processoId.toString());

    return this.httpClient.get<ProcessoModel[]>(environment.endpoint.PROCESSO_PENDETE_APROVACAO, { params: p });
  }

  carregar(id: Number) {
    return this.httpClient.get<ProcessoModel>(environment.endpoint.PROCESSO + "/" + id.toString());
  }

  salvar(processo: ProcessoModel) {
    return this.httpClient.post(environment.endpoint.PROCESSO, processo, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  atualizar(processo: ProcessoModel) {
    return this.httpClient.put(environment.endpoint.PROCESSO + "/" + processo.processoId.toString(), processo,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deletar(processo: ProcessoModel) {
    return this.httpClient.delete(environment.endpoint.PROCESSO + "/" + processo.processoId.toString());
  }

}
