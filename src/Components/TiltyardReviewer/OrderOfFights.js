import React, { useState } from 'react'
import {Table, TableBody, TableCell, Grid, TextField, styled, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import { HomeSvgSelector } from '../Custom/HomeSvgSelector';
import axios from 'axios';
import {useUser} from "../context/user";

function OrderOfTiltyard(props) {

    const[update, setUpdate] = useState([])
    const [order, setOrder] = useState(props.currentOrder)
    const {user, setUser} = useUser();

    const[edited, setEdited] = useState(false)
    const handleCloseEdit = () => {
        if(edited) {
            let arr_1 = Array.from(new Set(update));
            console.log(arr_1)
            arr_1.map(pairID => {
                axios.put(`http://127.0.0.1:8000/api/battleOrder/${props.currentOrder[pairID].id}/`, {
                    left_scores: props.currentOrder[pairID].left_scores,
                    right_scores: props.currentOrder[pairID].right_scores,
                }).then(result => {
                    if(result.status === 200) {
                        console.log(result)
                        
                    }}) 
                }
            )
            setEdited(!edited)
            console.log(props.currentOrder)
            order.sort(compareNumericOrder)
        }
        else{
            setEdited(!edited)
            console.log(props.currentOrder)
            order.sort(compareNumericOrder)
        }
        
    }

    function compareNumericOrder(a, b) {
        if (a.Order > b.Order) return 1;
        if (a.Order == b.Order) return 0;
        if (a.Order < b.Order) return -1;
      }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));

    

  return (
    <>
    <h4  align = {"center"}>БОИ</h4>
    {user && user.role == 3 &&
        <svg onClick={() => handleCloseEdit(!edited)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
    }
    
        <TableContainer  sx={{
            body: {
        overflowY: "scroll",
        overflowX: "hidden", 
        top: "20px",
        bottom: "20px",
            },
            "&::-webkit-scrollbar": {
        webkitBoxShadow : "inset 0 0 6px rgba(0,0,0,0.3)",
        webkitBorderRadius: "10px",
        borderRadius: "10px",
        width: "2px",
        height: "2px"
            },
            "&::-webkit-scrollbar-track": {
        webkitBoxShadow:" inset 0 0 6px rgba(0,0,0,0.3)", 
        webkitBorderRadius: "10px",
        borderRadius: "10px",
        marginTop: "75px",
        marginBottom: "15px",
            },
            "&::-webkit-scrollbar-thumb": {
        webkitBorderRadius: "10px",
        borderRadius: "10px",
        background: "#CCD1DD", 
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
        }, maxHeight: "50vh", minHeight: "50vh"  }} component={Item}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell  sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            №
                        </TableCell> */}
                        <TableCell  sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            ФИО
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            Клуб
                        </TableCell>
                        <TableCell   sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="center" style={{  }} >
                            Счет
                        </TableCell>
                        <TableCell  sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="right" style={{  }} >
                            Клуб
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="right" style={{  }} >
                            ФИО
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.map((pair, fightersIndex) => {
                        return (
                            <TableRow key = {pair.id}> 
                                    {/* <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none" }} align="left">
                                        {pair.Order}
                                    </TableCell> */}
                                    <TableCell size='small'  sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="left">
                                        <div  className="cell-name-small">{pair.left_fighter.last_name} {pair.left_fighter.first_name[0]}. {pair.left_fighter.patronymic[0]}.</div>
                                    </TableCell>
                                    <TableCell size='small'  sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="left">
                                        <div className="cell-club-small">{pair.left_fighter.club.name}</div>
                                    </TableCell>
                                    {!edited?
                                        <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="center">
                                        {pair.left_scores}:{pair.right_scores}
                                    </TableCell> 
                                    :
                                    <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="center">
                                        <TextField  type={"number"} onChange={(event) => {
                                            if(event.target.value > 10)  
                                                (event.target.value = 0)
                                            else{
                                                pair.left_scores = event.target.value ;
                                                update.push(fightersIndex) ;
                                                }
                                            
                                        }} style = {{width: "45%"}} id="standard-basic" variant="standard" size="small" defaultValue={pair.left_scores} />:
                                        <TextField type={"number"}  size="small" onChange={(event) => {
                                            if(event.target.value > 10)  
                                                (event.target.value = 0)
                                            else{
                                                pair.right_scores = event.target.value ;
                                                update.push(fightersIndex) ;
                                                }
                                        }} style = {{width: "45%"}} defaultValue={pair.right_scores} id="standard-basic" variant="standard" />
                                    </TableCell>}
                                    <TableCell size='small'  sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="right">
                                        <div className="cell-club-small">{pair.right_fighter.club.name}</div>
                                    </TableCell>
                                    <TableCell size='small'  sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                    color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="right">
                                        <div  className="cell-name-small">{pair.right_fighter.last_name} {pair.right_fighter.first_name[0]}. {pair.right_fighter.patronymic[0]}.</div>
                                    </TableCell>
                            </TableRow>
                        )})}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

export default OrderOfTiltyard