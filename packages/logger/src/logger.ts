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
        console.log(debug);
        debug.formatters = {
            l: (level: LEVEL) => LEVEL[level],
            t: (date: Date) => `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
        };
        this.debugger = debug(name);
    }

    public debug(message: string) { this.log(message, LEVEL.DEBUG) }
    public info(message: string) { this.log(message, LEVEL.INFO) }
    public error(message: string) { this.log(message, LEVEL.ERROR) }
    public fatal(message: string) { this.log(message, LEVEL.FATAL) }

    private log(message: string, level: LEVEL) {
        this.debugger(`(%t) [%l] %s`, new Date(), level, message);
    }
}