import { Navigate } from "react-router-dom";

import { UserStorage } from "../../store/userStorage";

interface Props {
  element: JSX.Element
}

const AuthProvider = ({element}: Props) => {
  return (
    UserStorage.isAuthenticated() ? element : <Navigate to="/login" />
  );
};

export default AuthProvider
