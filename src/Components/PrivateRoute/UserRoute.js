import React, {useState} from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useUser } from "../context/user";
import TiltyardEditor from '../TiltyardCreate/TiltyardEditor';



const UserRoute = () => {
  
  const {authTokens, setAuthTokens} = useAuth();
  const {user, setUser} = useUser();
  console.log(authTokens)
  console.log(user)
  let location = useLocation();

  return authTokens && user.role === 4 ? <TiltyardEditor /> : <Navigate to="/login" state={{ from: location }}/>
}

export default UserRoute;