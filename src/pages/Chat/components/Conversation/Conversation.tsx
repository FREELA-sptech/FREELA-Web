import { Avatar, AvatarGroup, Box } from "@mui/material";
import "./style.scss";
import { UserStorage } from "../../../../store/userStorage";

export type Props = {
  localData: any,
  handleGetMessagesData: (id: any) => void
}

export default function Conversation({ localData, handleGetMessagesData }: Props) {

  const convertTime = (time) => {
    const newTime = new Date(time)
    const hours = newTime.getHours() < 10 ? "0" + newTime.getHours() : newTime.getHours()
    const minutes = newTime.getMinutes() < 10 ? "0" + newTime.getMinutes() : newTime.getMinutes()
    const newHours = hours + ":" + minutes;

    return newHours
  }

  return (
    <Box className="w-100 d-flex justify-content-between conversation" onClick={() => {handleGetMessagesData(localData.id)}}>
      <Box className="d-flex" style={{ gap: "1rem" }}>
        <Avatar
          sx={{
            width: "48px",
            height: "48px",
            bgcolor: "#274C77",
          }}
          alt={"Usuario"}
          src={`data:image/png;base64, ${UserStorage.getIsFreelancerLocalStorage() ?
            localData.freelancerUser.profilePhoto :
            localData.clientUser.profilePhoto}`}
        />
        <Box className="info-order-main">
          <h2 className="f-20 f-inter dark-contrast-color fw-bold title-conversation" style={{
            padding: 0,
            margin: 0,
          }}>{localData.order.title}</h2>
          <p className="fw-bold f-roboto aditional-color f-14" style={{ padding: 0, margin: 0 }}>
            {UserStorage.getIsFreelancerLocalStorage() ?
              localData.freelancerUser.name :
              localData.clientUser.name}
          </p>
        </Box>
      </Box>
      <Box className="align-self-start">
        <p className="fw-bold f-roboto aditional-color f-14" style={{ padding: 0, margin: 0 }}>
          {convertTime(localData.lastUpdate)}
        </p>
      </Box>
    </Box>
  )

}
