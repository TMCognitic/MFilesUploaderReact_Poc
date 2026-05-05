import { FileUploader } from "devextreme-react";
import { useState } from "react";
import { fileTypes } from "../utils/FileTypes";
import type { FileInfo } from "../types/FileInfo";

export const MultiFiles = () => 
{
    const [filesDetails, setFilesDetails] = useState<FileInfo[] | null>(null);

    const onValueChange = (f: File[]) =>
    {
        let files: FileInfo[] = filesDetails ?? [];        
        console.log("f : \n----------------------------------------------------------------");  
        console.log(f);              
        console.log("files : \n----------------------------------------------------------------");        
        console.log(files);
        
        files = files.concat(f.map(cf => ({ uid: crypto.randomUUID(), name: cf.name, type: cf.type,  isValid: fileTypes.includes(cf.type), errorMessage: (fileTypes.includes(cf.type)) ? null : "Mauvais type de fichier", content: null }) as FileInfo));
        console.log("new files : \n----------------------------------------------------------------");        
        console.log(files);
        setFilesDetails(files);      
    };

    const onUpload = (file: File) =>
    {
        console.log(file.name);        
    };

    return (<>
            {filesDetails?.map(f => <p key={f.uid}>{f.name}</p>)}
            <FileUploader
                accept=".docx, .pdf"
                id="file-uploader"
                multiple={true}
                uploadMode="useButtons"                     
                showFileList={false}   
                onValueChange={onValueChange}
                uploadFile={onUpload}                
             />
    </>);
};