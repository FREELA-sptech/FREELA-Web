import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";
import { Box, Grid } from "@mui/material";
import ListConversation from "./components/ListConversations/ListConversation";
import ChatComponent from "./components/ChatComponent/ChatComponent";
// import WebSocket from 'websocket';
import { useEffect, useState } from "react";
import { UserStorage } from "../../store/userStorage";
import React from "react";
import useWebSocket from "react-use-websocket";
import { ChatApi } from "../../api/chatApi";

export default function Chat() {
  const { getMessagesById, getChats } = ChatApi();
  const [chatData, setChatData] = useState<any>();
  const [chatDataDetails, setChatDataDetails] = useState();
  const [messagesData, setMessagesData] = useState<any>();
  const url = `wss://freela-chat-service.duckdns.org/chat?userId=${UserStorage.getIdUserLocalStorage()}`;
  //const url = `ws://localhost:9090/chat?userId=${UserStorage.getIdUserLocalStorage()}`;

  const options = {
    onOpen: () => { },
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(url, options);

  const handleGetChats = () => {
    getChats(UserStorage.getIdUserLocalStorage(), UserStorage.getIsFreelancerLocalStorage()).then((res) => {
      setChatData(res.data);
    });
  };

  const handleGetMessagesData = (id: any) => {
    getMessagesById(id).then((res) => {
      const newChatData = chatData.filter((data: any) => data.id == id);

      setChatDataDetails(newChatData[0]);
      setMessagesData(res.data);
    });
  };

  const handleSendMessage = (message: string, chatId: number, to: number) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const time = `${year}-${month}-${day}`;

    const request = {
      message: message,
      time: time,
      chatId,
      to,
    };

    const messageLocal = JSON.stringify(request);
    sendMessage(messageLocal);
  };

  useEffect(() => {
    handleGetChats();
    if (lastMessage !== null) {
      const message = JSON.parse(lastMessage.data);
      setMessagesData([...messagesData, message]);
    }
  }, [lastMessage]);

  return (
    <section className="home-background">
      <Container className="container-chat">
        <Grid container className="w-100">
          <Grid item lg={4} md={5}>
            {chatData && (
              <ListConversation
                handleGetMessagesData={handleGetMessagesData}
                chatData={chatData}
              />
            )}
          </Grid>
          <Grid item lg={8} md={7}>
            {chatData && messagesData ? (
              <ChatComponent
                handleSendMessage={handleSendMessage}
                chatData={chatDataDetails}
                messagesData={messagesData}
              />
            ) : (
              <Grid
                container
                className="chat-component d-flex flex-column align-items-center w-100"
              >
                <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                  <img style={{ height: `80%` }} src="/assets/images/chat fundo.jpg" />
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
