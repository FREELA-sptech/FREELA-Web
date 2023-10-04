import { Avatar, Grid } from "@mui/material";
import "./style.scss";
import Conversation from "../Conversation/Conversation";

export type Props = {
  chatData: any;
  handleGetMessagesData: (id: number) => void;
};

export default function ListConversation({
  chatData,
  handleGetMessagesData,
}: Props) {
  return (
    <Grid
      container
      className="list-conversation d-flex flex-column align-items-center h-100"
    >
      <Grid
        item
        justifyContent="space-between"
        sx={{height: '72px'}}
        className="list-conversation-header w-100 d-flex align-items-center justi"
      >
        <h2
          className="f-24 f-inter dark-contrast-color fw-bold "
          style={{ padding: 0, margin: 0 }}
        >
          Conversas
        </h2>
        <Avatar
          sx={{
            width: 50,
            height: 50,
            bgcolor: "#274C77",
            border: "4px solid white",
          }}
          alt={"namePhoto"}
          src={`data:image/png;base64,`}
        />
      </Grid>
      <Grid
        item
        className="list-conversation-content d-flex flex-column align-items-center"
        style={{ gap: "0.5rem", padding: '10px' }}
      >
        {chatData.map((localData: any) => (
          <Conversation
            handleGetMessagesData={handleGetMessagesData}
            localData={localData}
          />
        ))}
      </Grid>
    </Grid>
  );
}
