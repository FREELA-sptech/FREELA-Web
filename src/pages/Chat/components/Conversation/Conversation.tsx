import { Avatar, AvatarGroup, Box } from "@mui/material";
import "./style.scss";

export default function Conversation(props: any) {

    return (
        <Box className="w-100 d-flex justify-content-between conversation">
            <Box className="d-flex" style={{gap:"1rem"}}> 
                <Avatar
                    sx={{
                        width: "48px",
                        height: "48px",
                        bgcolor: "#274C77",
                    }}
                    alt={"Usuario"}
                    src={`data:image/png;base64`}
                />
                <Box className="info-order-main">
                    <h2 className="f-20 f-inter dark-contrast-color fw-bold title-conversation" style={{
                        padding: 0,
                        margin: 0,
                    }}>Criação de Site Dahora e Legal</h2>
                    <p className="fw-bold f-roboto aditional-color f-14" style={{ padding: 0, margin: 0 }}>
                        Cliente, Freelancer
                    </p>
                </Box>
            </Box>
            <Box className="align-self-start">
                <p className="fw-bold f-roboto aditional-color f-14" style={{ padding: 0, margin: 0 }}>
                    20:30
                </p>
            </Box>
        </Box>
    )

}