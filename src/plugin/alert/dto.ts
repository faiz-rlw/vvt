export type types = {
    SUCCESS: string;
    WARNING: string;
    MESSAGE: string;
    ERROR: string;
};

export type alert = {
    (value: any): void;
    [name: string]: any;
};

export type options = {
    type?: string;
    message?: string;
    duration?: number;
};

export type alertArr = {
    height: number;
    margin: number;
    setTop: Function
}
