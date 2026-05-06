export type FileInfo = {
    uid: string,
    name: string,
    type: string,
    hash: string,
    isValid: boolean,    
    content: Uint8Array,
    file: File
};