import { Navigate } from "react-router-dom";

import { UserStorage } from "../../store/userStorage";

interface Props {
  element: JSX.Element
  path: string
}

const RedirectProvider = ({element, path}: Props) => {
  return (
    !UserStorage.isAuthenticated() ? element : <Navigate to={path} />
  );
};

export default RedirectProvider
