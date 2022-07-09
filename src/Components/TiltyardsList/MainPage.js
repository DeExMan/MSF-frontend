import axios from 'axios';
import {React, useState, useEffect} from 'react';
import {Grid, Box, Button, Container} from '@mui/material';
import {CustomLink} from '../Custom/CustomLink'
import { useAuth } from "../context/auth";
import {useUser} from "../context/user";
import Update from "../Img/Update.png"
import TiltyardBox from './TiltyardBox';
import {useNavigate } from 'react-router-dom';


function MainPage() {
    const [tiltyards, setTiltyards] = useState([]);
    const [intervalId, setIntervalId] = useState();
    const {authTokens, setAuthTokens} = useAuth();
    const {user, setUser} = useUser();
    const navigate = useNavigate()
    
    

    useEffect(() =>{
        fetchDataTiltyards()
        setIntervalId(setInterval(() => {
            console.log("Updating")
            fetchDataTiltyards()
    }, 100000));
    }, [])

    const fetchDataTiltyards = async () => {
        const tiltyards = await axios.get('http://127.0.0.1:8000/api/tiltyards/', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${authTokens}`
            },
        }).catch(error => console.log('error fetching tiltyards'))
        setTiltyards(tiltyards.data)
    }

    const updatedInformation = () => {
        fetchDataTiltyards()
        console.log("Updating")  
    }


    const logOut = () => {
        setAuthTokens();
        setUser();
        document.cookie ='' 
        clearInterval(intervalId)
    }

    const openTiltyardEditer = () => {

        navigate(`/tiltyardEditer/${tiltyards.length}`)
        clearInterval(intervalId)
    }

  return (
    <>
        <br/>

        <Grid container rowSpacing={4} columnSpacing={{ xs: 6, sm: 6, md: 6 }}>
            <Grid sx={{textAlign:"left"}} item xs={6}>
                <CustomLink to={'/login'} variant="contained" color={user ? "error" : "success"} onClick={()=>logOut()}>
                    {user ? "Выход" : "Вход"}
                </CustomLink>
            </Grid>

            <Grid sx={{textAlign:"right"}} item xs={6}>
                <Button variant="contained" color="secondary" onClick={()=>updatedInformation()}>{<img  width="45" height="45" className='tr-durUp'src={Update}/>}</Button>
            </Grid>
        </Grid>

            <h1 style ={{textAlign:'center'}}>СПИСОК РИСТАЛИЩ</h1>
            
            <br/>
            <br/>

            <Container>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={4} columnSpacing={{ xs: 6, sm: 6, md: 6 }}>
                        {tiltyards && tiltyards.map ((tiltyard , i) => (
                           <TiltyardBox tiltyard = {tiltyard} key = {i} intervalId={intervalId}/>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <br/>
            {user && user.role == 4 && tiltyards &&
            <div style={{textAlign:"center"}}>
                <Button variant="contained" color="success" onClick={()=>openTiltyardEditer()}>
                    Новое ристалище
                </Button>
            </div>
            // <TiltyardCreater referees ={referees} updatedInformation = {updatedInformation} tiltyardCount = {tiltyards.length}/>
            }
    </>
  )
}

export default MainPage