export type types = {
    SUCCESS: string;
    WARNING: string;
    MESSAGE: string;
    ERROR: string;
};

export type iconSvg = {
    [name:string] : any
}

export type toast = {
    (value: any): void;
    [name: string]: any;
};

export type options = {
    type: string;
    message: string;
    duration: number;
};

export type toastArr = {
    height: number;
    margin: number;
    setTop: Function
}
