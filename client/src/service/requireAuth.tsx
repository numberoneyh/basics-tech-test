import {FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/auth";

interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth: FC<RequireAuthProps> = ({children}) => {
  const location = useLocation()
  const {isAuth} = useAuth()
  if (!isAuth) {
    return <Navigate to='/signin' state={{from: location.pathname}}/>
  }

  return children
};

export  {RequireAuth};