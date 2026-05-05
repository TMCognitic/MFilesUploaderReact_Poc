export type FileInfo = {
    uid: string,
    name: string,
    type: string,
    isValid: boolean,
    errorMessage: string | null,
    content: Uint8Array[] | null
};