import { FileUploader, DataGrid, Button } from "devextreme-react";
import { useCallback, useRef, useState } from "react";
import { fileTypes } from "../utils/ValidFileTypes";
import type { FileInfo } from "../types/FileInfo";
import type { ValueChangedEvent } from "devextreme/ui/file_uploader";
import { Column } from "devextreme-react/data-grid";
import type { ColumnCellTemplateData } from "devextreme/ui/data_grid";
import type dxDataGrid from "devextreme/ui/data_grid";
import { DeleteButton } from "../components/DeleteButton";


export const MultiFiles = () => {
  const [filesDetails, setFilesDetails] = useState<FileInfo[]>([]);

  const gridRef = useRef<dxDataGrid>(null);

  const hashFile = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-512", buffer);
    const hash = [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, "0")).join("");
    return Promise.resolve(hash);
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

  const onUpload = async (e: ValueChangedEvent) => {
    if (e.value && e.value.length > 0) {      
      const files: File[] = e.value;
      console.log(`received ${files.length} files : \n`, files);
      const fileInfos: FileInfo[] = (await filesDetails).slice();
      console.log(`starting with fileInfos (${fileInfos.length}) : \n`, fileInfos);

      for (let fileIndex: number = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex];
        console.log(`starting with fileInfos (${fileInfos.length}) : \n`, fileInfos);
        console.log(`traitement de ${file.name}`);
        const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
        const bytes: Uint8Array = new Uint8Array(arrayBuffer);
        console.log(`Bytes (${bytes.length}) : \n ${bytes}`);
        const hash: string = await hashFile(file);
        console.log(`Hash : (${hash})`);
        const isValid = (file.type in fileTypes);
        console.log(`type : (${file.type})`);

        let found: boolean = false;

        if (fileInfos.length) {
          for (let i: number = 0; !found && i < fileInfos.length; i++) {
            const result: boolean = await areFileEqual(fileInfos[i].file, file);
            if (result)
              found = true;
          }
        }

        console.log(`file ${file.name} found : ${found}`);

        if (!found) {
          fileInfos.push(({ uid: crypto.randomUUID(), name: file.name, type: file.type, isValid: isValid, hash: hash, file: file }) as FileInfo);
        }
        
        console.log("setFilesDetails");
        console.log(fileInfos);
      };      
      
      await setFilesDetails(fileInfos);
      e.component.clear();
    }
  };

  const renderTypeCell = useCallback(
    (cellData: ColumnCellTemplateData<FileInfo>) => {
      const type: string = cellData.data!.type;
      return (
        <div>{type in fileTypes ? fileTypes[type] : 'Invalid Type'}</div>
      );
    }, []);

  const handleDelete = useCallback((uid: string): void => {
    const files = filesDetails.filter(fi => fi.uid !== uid);
    setFilesDetails(files);
    console.log(`Files : ${files.length}`, files);
  }, [filesDetails]);

  const renderDeleteCell = useCallback(
    (cellData: ColumnCellTemplateData<FileInfo>) => {
      return (
        <DeleteButton uid={cellData.data!.uid} onDelete={handleDelete}>Delete</DeleteButton>
      );
    }, [handleDelete]);

  const uploadOneFile = async ({ file, ...metadata }: FileInfo) => {
    console.log(`metadata : `, metadata);
    const formData = new FormData();
    formData.append("files", file);
    formData.append("metadata", JSON.stringify(metadata));

    const response = await fetch("https://localhost:7207/mfiles", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const json = await response.text();
      throw new Error(`Erreur upload ${file.name} : ${json}`);
    }

    return response.json();
  };

  const submit = async () => {
    if (!filesDetails) return;

    let fileInfos: FileInfo[] = (await filesDetails).slice();

    // Ajouter chaque fichier
    const uploads = Array.from(fileInfos).filter(fi => fi.isValid).map(fileInfo =>
      uploadOneFile(fileInfo)
    );

    const results = await Promise.allSettled(uploads);

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        fileInfos = fileInfos.filter(fi => fi !== filesDetails[index]);
        console.log(`OK : ${filesDetails[index].file.name}`, result.value);
      } else {
        console.error(`Erreur : ${filesDetails[index].file.name}`, result.reason);
      }
    });

    await setFilesDetails(fileInfos);
  };

  return (<>
    {filesDetails && (<DataGrid
      ref={gridRef}
      dataSource={filesDetails}
      height='95%'
      width='100%'
      remoteOperations={{ paging: false, filtering: false, sorting: false }}
      //sorting={{ mode: 'multiple' }} // Enable multiple column sorting, use shift for that
      showBorders
      showRowLines
      showColumnLines
      rowAlternationEnabled
      hoverStateEnabled
      scrolling={{
        mode: 'standard',
      }}
      visible={filesDetails.length ? true : false} className="align-element">
      <Column dataField='uid' dataType='string' width='auto' cssClass="uppercaseText" />
      <Column dataField='name' dataType='string' width='15%' />
      <Column
        caption='Type'
        cellRender={renderTypeCell}
        width='10%'
        allowFiltering={false}
        allowSorting={false}
        dataType='string'
      />
      <Column dataField='isValid' dataType='string' width='auto' />
      <Column
        caption=''
        cellRender={renderDeleteCell}
        width='5%'
        allowFiltering={false}
        allowSorting={false}
        dataType='object'
      />
    </DataGrid>)}
    <FileUploader
      accept="*"
      id="file-uploader"
      multiple={true}
      uploadMode="instantly"
      showFileList={false}
      //onValueChange={onValueChange}
      uploadFile={() => { }}
      onValueChanged={onUpload}
    />
    <Button onClick={submit}>Send</Button>
  </>);
};
