export class FuncoesUtis {
    static
        documentHeight() {
        return Math.max(
            window.innerHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight
        );
    }
    static
        documentWidth() {
        return Math.max(
            window.innerWidth,
            document.body.offsetWidth,
            document.documentElement.clientWidth
        );
    }
}
