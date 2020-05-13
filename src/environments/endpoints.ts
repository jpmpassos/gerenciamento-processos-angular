
const env = {
    prod: {
        BACK_HOST: 'http://producao-url'
    },
    dev: {
        BACK_HOST: 'http://localhost:8080'
    }
}

export const endpoins = (ambiente: string) => {
    const URL_BASE = env[ambiente].BACK_HOST;
    return {
        USUARIO: `${URL_BASE}/usuario`,
        USUARIO_FINALIZADOR: `${URL_BASE}/usuario/finalizador`,
        USUARIO_AUTHENTICATION: `${URL_BASE}/usuario/autenticacao`,

        PARECER: `${URL_BASE}/parecer`,
        PARECER_POR_PROCESSO: `${URL_BASE}/parecer/porprocesso`,
        PARECER_PENDENTE_POR_USUARIO: `${URL_BASE}/parecer/pendenteporusuario`,

        PROCESSO: `${URL_BASE}/processo`,
        PROCESSO_PENDETE_APROVACAO: `${URL_BASE}/processo/pendenteaprovacao`,
    }
}