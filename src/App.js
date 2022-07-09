import './App.scss';
import {ThemeProvider } from '@mui/material/styles';
import {React, useState, useEffect} from 'react';
import theme from './Theme';
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import {AuthContext} from "./Components/context/auth";
import {UserContext} from "./Components/context/user";
import axios from "axios";
import {useCookies} from 'react-cookie';
import {Container} from '@mui/material';

import Login from './Components/Login/Page';
import MainPage from "./Components/TiltyardsList/MainPage"
import TiltyardEditor from './Components/TiltyardCreate/TiltyardEditor'
import UserRoute from './Components/PrivateRoute/UserRoute';
import Reviewer from './Components/TiltyardReviewer/Reviewer';

function App() {
  const [authTokens, setAuthTokens] = useState();
  const [loadingData, setLoadingData] = useState(true)
  const [user, setUser] = useState();
  const [token, setToken, removeToken] = useCookies(['mytoken'])



  useEffect(() => {
    cookieLogin(document.cookie)
  }, [])


  function cookieLogin(token) {
    if(token){
      axios.post(`http://127.0.0.1:8000/authenticate/`, {
          headers: {'Authorization': `Token ${token['mytoken']}`}
      }).then(result => {
          if (result.status === 200) {
            console.log(result)
          }
      }).catch(e => console.log(e))
  }
  }

  // const setUserContext = (data) => {
  //   setUser(data);
  // }

  // const setTokens = (data) => {
  //   setToken(data);
  // }

  return(
    <AuthContext.Provider value={{authTokens, setAuthTokens}}>
      <UserContext.Provider value={{user, setUser}}>
        <ThemeProvider theme={theme}>
          <Container maxWidth='xl'>
            <BrowserRouter>
              <Routes>
                <Route path = "/login" element = {<Login/>} />
                <Route path = "/" element = {<MainPage/>} />
                <Route path="*" element={<Navigate to="/" replace />}/>
                <Route path="/tiltyardEditer/:length" element={<UserRoute />}/>
                <Route path="/TiltyardReviewer/:id" element={<Reviewer/>}/>
              </Routes>
            </BrowserRouter>
          </Container>
        </ThemeProvider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
