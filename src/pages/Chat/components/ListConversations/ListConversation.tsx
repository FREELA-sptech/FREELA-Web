import { Avatar, Grid } from "@mui/material";
import "./style.scss";
import Conversation from "../Conversation/Conversation";

export type Props = {
  chatData: any,
  handleGetMessagesData: (id) => void
}

export default function ListConversation({ chatData, handleGetMessagesData }: Props) {
  return (
    <Grid container className="list-conversation d-flex flex-column align-items-center h-100">
      <Grid item className="list-conversation-header w-100 d-flex align-items-center">
        <h2 className="f-30 f-inter dark-contrast-color fw-bold " style={{ padding: 0, margin: 0 }}>
          Conversas
        </h2>
      </Grid>
      <Grid item className="list-conversation-content d-flex flex-column align-items-center" style={{ gap: "0.5rem" }}>
        {chatData.map((localData: any) => (
          <Conversation handleGetMessagesData={handleGetMessagesData} localData={localData} />
        ))}
      </Grid>
    </Grid>
  )
}
