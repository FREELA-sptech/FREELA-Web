import { Avatar, Grid } from "@mui/material";
import "./style.scss";

export default function ListConversation() {
    return (
        <Grid container className="list-conversation d-flex flex-column align-items-center h-100">
            <Grid item className="list-conversation-header w-100 d-flex align-items-center">
                <h2 className="f-30 f-inter dark-contrast-color fw-bold " style={{ padding: 0, margin: 0 }}>
                    Conversas
                </h2>
            </Grid>
            <Grid item className="list-conversation-content d-flex flex-column align-items-center justify-content-center">
                Nenhuma Proposta Aceita
            </Grid>
        </Grid>
    )
}