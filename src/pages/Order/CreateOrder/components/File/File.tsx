import { Box, Chip } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdClose, MdError, MdLink, MdTrackChanges } from "react-icons/md";
import "./style.scss";

export function File({ files, onDelete }) {
    return (
        <Box className="container-files">
            {files.map(uploadedFile => (
                <div className="preview">
                    <img className="img-preview" src={uploadedFile.image} alt="" />
                    <Chip label={<MdClose color="#f9f9f9" size={32}/>} className="btn-trash" onClick={() => onDelete(uploadedFile.id)} />
                    <a className="link-image" href={uploadedFile.image} target="_blank"><Chip label={<MdLink  size={32} color="#f9f9f9" />}/></a>
                </div>
            ))}
        </Box>
    );
}