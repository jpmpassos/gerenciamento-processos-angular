import { UsuarioModel } from '../model/usuario-model';
import { isNullOrUndefined } from 'util';

export class LoginUtil {

    constructor() {
    }

    static getUsuarioLogado(): UsuarioModel {
        const str = sessionStorage.getItem('Usuario');
        if (!isNullOrUndefined(str) && str !== '') {
            return JSON.parse(str);
        }
        return null;
    }

    static isLogado(): boolean {
       return !isNullOrUndefined(this.getUsuarioLogado());
    }

    static isAdmin(): boolean {
       return !isNullOrUndefined(this.getUsuarioLogado()) && this.getUsuarioLogado().admin;
    }

    static isTriador(): boolean {
       return !isNullOrUndefined(this.getUsuarioLogado()) && this.getUsuarioLogado().triador;
    }

    static isFinalizador(): boolean {
       return !isNullOrUndefined(this.getUsuarioLogado()) && this.getUsuarioLogado().finalizador;
    }

    static getAutenticacao(): string {
        return sessionStorage.getItem('Authorization');
    }

    static gravarAutenticacao(usuario: UsuarioModel) {
        sessionStorage.setItem('Usuario', JSON.stringify(usuario));
        sessionStorage.setItem('Authorization', btoa(usuario.login + ':' + usuario.senha));
    }

    static limparAutenticacao() {
        sessionStorage.setItem('Usuario', '');
        sessionStorage.setItem('Authorization', '');
    }
}