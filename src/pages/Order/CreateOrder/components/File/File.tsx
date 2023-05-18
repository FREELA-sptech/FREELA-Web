import { Box, Chip } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import "./style.scss";

export function File({ files, onDelete }) {
    return (
        <Box className="container-files">
            {files.map(uploadedFile => (
                <li style={{ listStyle: 'none', display: "flex", padding: "20px", gap: "1rem" }}>
                    <div className="preview">
                        <img className="img-preview" src={uploadedFile.preview} alt="" />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",

                    }}>
                        <h3 className="category">{uploadedFile.name}</h3>
                        <p>{uploadedFile.readableSize}
                        </p>
                    </div>

                    {!!uploadedFile.preview && !uploadedFile.error && (
                        <Chip label="Excluir" color="error" onClick={() => onDelete(uploadedFile.id)} />
                    )}
                    {uploadedFile.preview && !uploadedFile.error && (
                        <a href={uploadedFile.preview} target="_blank"><MdLink style={{ marginRight: 8 }} size={24} color="#222" /></a>
                    )}
                    {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                    {uploadedFile.error && <MdError size={24} color="#e57878" />}

                </li>
            ))}
        </Box>
    );
}