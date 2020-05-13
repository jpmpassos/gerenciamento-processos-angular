import { StatusParecerEnum } from '../enums/status-parecer.enum';
import { ProcessoModel } from './processo-model';
import { UsuarioModel } from './usuario-model';

export class ParecerModel {
    constructor(
        public parecerId?: number,
        public descricao?: string,
        public status?: StatusParecerEnum,
        public processo?: ProcessoModel,
        public usuario?: UsuarioModel
    ) { }
}
