import { Avatar, AvatarGroup, Box, Button, Grid, TextField } from "@mui/material";
import "./style.scss";
import MessageBox from "../MessageBox/MessageBox";
import { MdSend } from "react-icons/md";
import { UserStorage } from "../../../../store/userStorage";
import { useEffect, useRef, useState } from "react";

export type Props = {
  chatData: any,
  messagesData: any,
  handleSendMessage: (message: string, chatId: number, to: number) => void
}

export default function ChatComponent({
  chatData,
  messagesData,
  handleSendMessage
}: Props) {
  const [message, setMessage] = useState('')
  const messagesContainerRef = useRef<any>(null);
  const photo = !UserStorage.getIsFreelancerLocalStorage() ? chatData.freelancerId.photo : chatData.userId.photo

  const handleSubmit = () => {
    const to =
      !UserStorage.getIsFreelancerLocalStorage() ?
        chatData.freelancerId.id :
        chatData.userId.id

    handleSendMessage(message, chatData.id, to)
    setMessage('')
  }

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messagesData]);

  return chatData ? (
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
            src={photo ? `data:image/png;base64, ${photo}` : "/assets/images/profile.png"}
          />
          <Box className="d-flex align-items-start justify-content-center flex-column">
            <h2 className="f-20 f-inter dark-contrast-color fw-bold" style={{ padding: 0, margin: 0 }}>
              {!UserStorage.getIsFreelancerLocalStorage() ?
                chatData.freelancerId.name :
                chatData.userId.name}
            </h2>
            <p className="fw-bold f-roboto aditional-color f-14" style={{ padding: 0, margin: 0 }}>
              {!UserStorage.getIsFreelancerLocalStorage() ?
                chatData.freelancerId.name :
                chatData.userId.name}
            </p>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        className="chat-component-content w-100 d-flex flex-column gap-3"
        style={{ alignSelf: "end", flexGrow: 1 }}
        ref={messagesContainerRef}
      >
        {messagesData && messagesData.map((messageLocal: any) => (
          <MessageBox
            message={messageLocal.message}
            sender={UserStorage.getIdUserLocalStorage() == messageLocal.userIdFrom} />
        ))}
      </Grid>
      <Grid item className="chat-component-footer w-100 d-flex" style={{ padding: "1rem", gap: "1rem" }}>
        <TextField
          id="description"
          name="description"
          fullWidth
          label="Mensagem"
          value={message}
          size="small"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <MdSend style={{ fontSize: '25px', height: '100%', cursor: 'pointer' }} color="#274C77" onClick={handleSubmit} />
      </Grid>
    </Grid>
  ) : null
}
