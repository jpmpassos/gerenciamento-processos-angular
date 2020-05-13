export class ParamUtil {
    static listMap: ParamMap[];

    public static setParam(key: string, param: any) {
        if (!this.listMap) {
            this.listMap = [];
        }

        let m = this.listMap.find(r => r.key === key);
        if (m) {
            m.param = param;
        } else {
            this.listMap.push(new ParamMap(key, param));
        }
    }

    public static getParam(key: string): any {
        if (!this.listMap) {
            return null;
        }

        let m = this.listMap.find(r => r.key === key);

        if (m) {
            this.listMap = this.listMap.filter(r => r.key !== key);
            return m.param;
        }
        return null;
    }
}

class ParamMap {
    constructor(
        public key: string,
        public param: any
    ) { }
}
