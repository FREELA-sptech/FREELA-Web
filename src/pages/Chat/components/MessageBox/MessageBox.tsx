import { Box } from "@mui/material";
import "./style.scss";

export default function MessageBox(props: any) {
  const { message, date, sender } = props;
  return sender ? (
    <Box className="message-box d-flex align-self-end sender">
      <p style={{ padding: 0, margin: 0 }}> {message}</p>
    </Box>
  ) : (
    <Box className="message-box d-flex align-self-start addressee">
      <p style={{ padding: 0, margin: 0 }}> {message}</p>
    </Box>
  );
}
