import * as dto from "./dto";

export const types: dto.types = {
    SUCCESS: "success",
    WARNING: "warning",
    MESSAGE: "message",
    ERROR: "error",
};

export function findTypesKey(val: string): string {
    const currentIndex = Object.values(types).findIndex((item) => item === val);
    return Object.keys(types)[currentIndex];
}
