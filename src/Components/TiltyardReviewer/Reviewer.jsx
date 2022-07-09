import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useParams,} from 'react-router-dom';
import { useAuth } from "../context/auth";
import { Button, ButtonGroup, Box, Grid, FormControl, InputLabel,
  Select, MenuItem, Table, TableBody, TableCell, styled, 
  TableContainer, TableHead, TableRow, Paper, Modal, Slide  } from '@mui/material';
import { CustomLink } from '../Custom/CustomLink';
import FightersList from './FightersList';
import OrderOfFights from './OrderOfFights';
import BattleHistory from './BattleHistory';
import FinalTable from './FinalTable';


function Reviewer() {
  const {id} = useParams();
  const {authTokens, setAuthTokens} = useAuth();

  const [battleOrder, setBattleOrder] = useState();
  const [tiltyard, setTiltyard] = useState();
  const [fighterList, setFighterList] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  
  useEffect(() =>{
    let order = []
    let fightersList = []
    axios.get(`http://127.0.0.1:8000/api/tiltyards/${id}/`)
    .then(result => {
      let Tiltyard = result.data
      axios.get(`http://127.0.0.1:8000/api/battleOrder/`)
      .then(result => {
        let data = result.data
        let fighters = []
        data.map(pair => {
          if(pair.Tiltyard.id == id)
            order.push(pair)
            fightersList.push(pair.left_fighter)
            fightersList.push(pair.right_fighter)
        })
        let i = []
        let uniqueChars = [];
        fightersList.forEach((element, index) => {
        if (!uniqueChars.includes(element.id)) {
          uniqueChars.push(element.id);
          i.push(index)
        }
        });
        i.forEach(index => {
          fighters.push(fightersList[index])
        })
        fighters.sort(compareNumeric)
        console.log(order)
        order.sort(compareNumericOrder)
        setBattleOrder(order)
        setFighterList(fighters)
        setTiltyard(Tiltyard)
        console.log(fighters);
        console.log(order)
      })
    })
    
  }, [])

  function compareNumericOrder(a, b) {
    if (a.Order > b.Order) return 1;
    if (a.Order == b.Order) return 0;
    if (a.Order < b.Order) return -1;
  }

  function compareNumeric(a, b) {
    if (a.number > b.number) return 1;
    if (a.number == b.number) return 0;
    if (a.number < b.number) return -1;
  }


  return (
    <>
    {tiltyard && battleOrder && 
    <>
    <Box sx={{ flexGrow: 1}}>
        <Grid container alignItems="center" spacing={1} >   
            <Grid item xs={4} md={4}  container justifyContent="left">
                <CustomLink variant="contained" color="error" to={'/'} >
                    К списку
                </CustomLink>           
            </Grid>
            <Grid item xs={12} md={4} sx = {{fontSize:36, textAlign: "center"}}  container justifyContent="center">
                <h1 className='textUpper'><b>{tiltyard.name}</b></h1>          
            </Grid>
            <Grid item xs={12} md={4} container justifyContent="right">
                <h3 style={{color:'#FDA286'}}>{tiltyard.state}</h3>  
                <p className='d3'></p>
            </Grid>
        </Grid>
    </Box>
    
    <Box sx={{ flexGrow: 1}}>
    {tiltyard.state == "Идет" ?

      <Grid container  justifyContent="space-between" alignItems="center" spacing={3}>
      <Grid item xs={12} md={5}  container justifyContent="center">
        {fighterList &&
        <FightersList fighterList = {fighterList}/> }
      </Grid>
      <Grid item xs={12} md={7}  container justifyContent="center">
        {battleOrder &&
        <OrderOfFights currentOrder = {battleOrder}/> }
      </Grid>
    </Grid>

    :
    <FinalTable tiltyard = {tiltyard} fighterList={fighterList}/>
    }
    </Box>
    <br/>
    <a textalign="center" className={open ? 'arrow-icon' : 'arrow-icon open'} onClick = {handleOpen}>
    <span className="left-bar"></span>
    <span className="right-bar"></span>
    <h5 textalign="center" >История этапов</h5>
    </a>
    
    
    <BattleHistory open={open} handleClose={handleClose} battleOrder={battleOrder} stage={tiltyard.stage}/>
    </>
    }
    </>
  )
}

export default Reviewer