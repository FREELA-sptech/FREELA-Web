import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";
import { Box, Grid } from "@mui/material";
import ListConversation from "./components/ListConversations/ListConversation";
import ChatComponent from "./components/ChatComponent/ChatComponent";

export default function Chat() {
    return (
        <section className="home-background">
            <Container className="container-chat">
                <Grid container className="w-100">
                    <Grid item lg={4} md={5}>
                        <ListConversation />
                    </Grid>
                    <Grid item lg={8} md={7}>
                        <ChatComponent />
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}