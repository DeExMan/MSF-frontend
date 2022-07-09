import { TextField, Box, Button, styled, Paper, Snackbar, createTheme, Grid, Alert} from '@mui/material';
import {React, useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useAuth} from "../context/auth";
import {useUser} from "../context/user";
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {authTokens, setAuthTokens} = useAuth();
  const {user, setUser} = useUser();
  const navigate = useNavigate()
  const [token, setToken] = useCookies()

  useEffect(() => {
    console.log(authTokens)
    if(authTokens)
    navigate('/')
  }, [])
  

  const loginBtn = () => {
    axios.post("http://127.0.0.1:8000/authenticate/", {
      username, 
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data.token);
        setToken('mytoken', result.data.token)
        axios.get(`http://127.0.0.1:8000/api/users/${result.data.id}/`)
        .then(user => {
          if (user.status === 200) {
            setUser(user.data);
            navigate('/');
          }
        }).catch(e => {
          setIsError(true);
          console.log(e, "не получил юзера");
        });
        
      }
    }).catch(e => {
      setIsError(true);
    console.log(e, "не получил токен");
  });
  }



  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "white",
    background: "#323846",
    boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
    borderRadius: "20px"
}));

  return (
    <Paper elevation={12} sx={{width: 615,
            height: 544, background:'#262E3E', color: "white",
            borderRadius:10, position:"absolute",
            top:"50%",
            left:"50%",
            margin:"-272px 0 0 -307px"}}>
      <Box >
        <Grid direction="column" justifyContent="center"
            alignItems="center" container spacing={2}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>ВХОД</h1>
            <div id = "app"></div>
            <Grid item xs={6}>
            
            <TextField sx={{color: "white"}} InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} error ={isError ? true : false } 
            id="login" label="Логин" variant="outlined" 
            onChange={e => setUserName(e.target.value)}/>
            </Grid>
            <Grid item xs={6}>
            <TextField error ={isError ? true : false } id="password" 
            label="Пароль" InputLabelProps={{style : {color : 'rgba(204, 209, 221, 1)'} }} variant="outlined" 
            InputProps={{style:{color: "white"}}} 
            onChange={e => setPassword(e.target.value)}/>
            </Grid >
            <br/>
            <Grid item xs={6} justifyContent="center"
            alignItems="center">
                <Snackbar open={isError} autoHideDuration={5000} onClose={() => setIsError(false)}>
                    <Alert severity="error">Не правильный логин или пароль</Alert>
                </Snackbar>
                </Grid>
                <Grid item xs={6} justifyContent="center"
            alignItems="center">
            <Button size ='large' variant="contained" color="success" onClick={loginBtn}>
               Вход
            </Button>
            </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Login