import { Box } from "@mui/material";
import { MdUploadFile } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { DropContainer,UploadMessage } from "./style";


export function UploadImage(props : any){

    function renderDragMessage(isDragActive,isDragReject){
        if (!isDragActive) return <UploadMessage>Arraste arquivos aqui...</UploadMessage>

        if(isDragReject) return <UploadMessage type="error">Arquivo não suportado</UploadMessage>

        return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
    }

    return(
        <Dropzone accept={{'image/*': ['.jpeg', '.jpg', '.png']}} onDropAccepted={props.onUpload}>
            {
                ({getRootProps,getInputProps,isDragActive,isDragReject}) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <MdUploadFile size={"32px"}/>
                        <input {...getInputProps()}/>
                        {renderDragMessage(isDragActive,isDragReject)}
                    </DropContainer>
                )
            }
        </Dropzone>
    );
}