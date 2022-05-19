export type types = {
    SUCCESS: string;
    WARNING: string;
    MESSAGE: string;
    ERROR: string;
};

export type toast = {
    (value: any): void;
    [name: string]: any;
};

export type options = {
    type: string;
    message: string;
    duration: number;
};
