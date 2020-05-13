export class UsuarioModel {
    constructor(
        public usuarioId?: number,
        public nome?: string,
        public admin?: boolean,
        public triador?: boolean,
        public finalizador?: boolean,
        public login?: string,
        public senha?: string
    ) { }
}
