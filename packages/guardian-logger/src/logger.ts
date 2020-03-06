import debug, {Debugger} from "debug";

export enum LEVEL {
    DEBUG,
    INFO,
    ERROR,
    FATAL
}

export class Logger {
    private debugger: Debugger;

    constructor(name: string){
        debug.log = console.info.bind(console);
        debug.formatters = {
            l: (level: LEVEL) => LEVEL[level]
        };
        this.debugger = debug(name);
        this.debugger.enabled = true;
        this.debugger['useColors'] = true;
    }

    public debug(message: string) { this.log(message, LEVEL.DEBUG) }
    public info(message: string) { this.log(message, LEVEL.INFO) }
    public error(message: string) { this.log(message, LEVEL.ERROR) }
    public fatal(message: string) { this.log(message, LEVEL.FATAL) }

    public extend(namespace: string) {
        return new Logger(this.debugger.namespace + ':' + namespace);
    }

    private log(message: string, level: LEVEL) {
        this.debugger(`[%l] %s`, level, message);
    }
}