import { FileUploader } from "devextreme-react";
import { useEffect, useRef, useState } from "react";
import { fileTypes } from "../utils/FileTypes";
import type { FileInfo } from "../types/FileInfo";
import type { Await } from "react-router-dom";


export const MultiFiles = () => {
  const [filesDetails, setFilesDetails] = useState<FileInfo[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`filesDetails (useEffect) size (${filesDetails?.length ?? 0}) : \n`, filesDetails);
  }, [filesDetails]);

  const hashFile = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-512", buffer);
    return Promise.resolve(Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join(""));
  };

  const areFileEqual = async (file1: File, file2: File): Promise<boolean> => {
    if (file1.name !== file2.name)
      return false;

    if (file1.size !== file2.size)
      return false;

    const hashf1 = await hashFile(file1);
    const hashf2 = await hashFile(file1);

    return Promise.resolve(hashf1 === hashf2);
  };

  const onUpload = async (file: File) => {
    const fileInfos : FileInfo[] = (await filesDetails)?.slice() ?? [];
    console.log(fileInfos);
    
    console.log(`starting with fileInfos (${fileInfos.length}) : \n`, fileInfos);
    console.log(`traitement de ${file.name}`);
    const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
    const bytes: Uint8Array = new Uint8Array(arrayBuffer);
    console.log(`Bytes (${bytes.length}) : \n ${bytes}`);
    const hash: string = await hashFile(file);
    console.log(`Hash : (${hash})`);            
    const isValid = fileTypes.includes(file.type);    
    console.log(`type : (${file.type})`);            

    let found: boolean = false;

    if(fileInfos.length)
    {
      for(let i: number = 0; !found && i < fileInfos.length; i++)
      {
        const result: boolean = await areFileEqual(fileInfos[i].file, file);
        if(result)
          found = true;
      }
    }

    console.log(`file ${file.name} found : ${found}`);

    if (!found) {      
      fileInfos.push(({ uid: crypto.randomUUID(), name: file.name, type: file.type, isValid: isValid, hash: hash, content: bytes, file: file }) as FileInfo);
    }
    console.log("setFilesDetails");
    console.log(fileInfos);
    await setFilesDetails(fileInfos);
  };

  return (<>
    <div ref={ref} id="Toto"></div>
    {filesDetails && filesDetails.map(f => <p key={f.uid}>{f.name}</p>)}
    <FileUploader
      accept=".docx, .pdf"
      id="file-uploader"
      multiple={true}
      uploadMode="instantly"
      showFileList={false}
      //onValueChange={onValueChange}
      uploadFile={onUpload}
    />
  </>);
};