import React from 'react'
import { Button, ButtonGroup, Box, Grid, FormControl, InputLabel,
    Select, MenuItem, Table, TableBody, TableCell, styled, 
    TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function FightersList(props) {


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
        <h4 align = {"center"}>БОЙЦЫ</h4>
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
        marginleft: "15px",
        marginRight: "15px",
        marginBottom: "15px",
            },
            "&::-webkit-scrollbar-thumb": {
        webkitBorderRadius: "10px",
        borderRadius: "10px",
        background: "#CCD1DD", 
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
            }, maxHeight: "50vh", minHeight: "50vh" }} component={Item}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            №
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            ФИО
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            Клуб
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.fighterList.map((fighter, fightersIndex) => {
                        return (
                            <TableRow
                            key = {fighter.id}> 
                                <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" scope="row">
                                    {fighter.number}
                                </TableCell>
                                <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                color:"white",  textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                    <div align="left" className='cell-name'>
                                    {fighter.last_name} {fighter.first_name[0]}. {fighter.patronymic[0]}.
                                    </div>
                                </TableCell>
                                <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                    <div align="left" className='cell-club'>
                                    {fighter.club.name}
                                    </div>
                                </TableCell>
                            </TableRow> 
                        )})} 
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

export default FightersList