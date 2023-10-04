import { Box } from "@mui/material";
import { MdUploadFile } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from "./style";
import { useCallback, useState } from "react";

export function UploadImage(props: any) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
      props.onUpload(acceptedFiles);
    },
    [selectedFiles, props.onUpload]
  );

  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;

    if (isDragReject) return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  }

  return (
    <div style={{ position: 'absolute' }}>
      <Dropzone accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }} onDropAccepted={handleDropAccepted}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }: any) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <MdUploadFile size={"32px"} />
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </div>
  );
}
