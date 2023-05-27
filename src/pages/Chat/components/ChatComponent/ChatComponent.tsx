import { Avatar, AvatarGroup, Box, Button, Grid, TextField } from "@mui/material";
import "./style.scss";
import MessageBox from "../MessageBox/MessageBox";
import { MdSend } from "react-icons/md";

export default function ChatComponent() {
    return (
        <Grid container className="chat-component d-flex flex-column align-items-center w-100">
            <Grid item className="chat-component-header w-100 d-flex align-items-center">
                <Box className="d-flex align-items-start justify-content-center" style={{ gap: "1rem" }}>
                    <Avatar
                        sx={{
                            width: "40px",
                            height: "40px",
                            bgcolor: "#274C77",
                        }}
                        alt={"Criação de Site Dahora e Legal"}
                        src={`data:image/png;base64`}
                    />
                    <Box className="d-flex align-items-start justify-content-center flex-column">
                        <h2 className="f-20 f-inter dark-contrast-color fw-bold" style={{ padding: 0, margin: 0 }}>
                            Criação de Site Dahora e Legal
                        </h2>
                        <p className="fw-bold f-roboto aditional-color f-14" style={{ padding: 0, margin: 0 }}>
                            Cliente, Freelancer
                        </p>
                    </Box>
                </Box>
            </Grid>
            <Grid item className="chat-component-content w-100 d-flex flex-column gap-3">
                <MessageBox message={"Não gostei da sua proposta, mas ta no caminho, podemos negociar?"} sender={false} />
                <MessageBox message={"No cap"} sender={false} />
                <MessageBox message={"Blz, vm ver isso ai"} sender={true} />
                <MessageBox message={"( ͡° ͜ʖ ͡°)"} sender={true} />
            </Grid>
            <Grid item className="chat-component-footer w-100 d-flex" style={{ padding: "1rem", gap: "0.8rem" }}>
                <TextField
                    id="description"
                    name="description"
                    fullWidth
                    label="Mensagem"
                    onChange={() => { }}
                />
                <Button
                    style={{
                        padding: "0.8rem",
                        background: "#274C77"
                    }}
                >
                    <MdSend color="#fff" />
                </Button>
            </Grid>
        </Grid>
    )
}