import React, { useState } from 'react'
import {Table, TableBody, TableCell, Grid, styled, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function OrderOfTiltyard(props) {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));

    

  return (
    <Grid item xs={7} md={7}  container justifyContent="center">
    <h4 align = {"center"}>БОИ</h4>
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
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            №
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            ФИО
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            Клуб
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            №
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            ФИО
                        </TableCell>
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} style={{  }} >
                            Клуб
                        </TableCell>
                    </TableRow>
                </TableHead>

                <>
                    {props.currentOrder &&
                    <TableBody>
                        {console.log(props.currentOrder)}
                        {props.currentOrder.map((fighter, fightersIndex) => {
                            return (
                                    <TableRow кеу={fighter.id}> 
                                            <TableCell width="4%" size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}}>
                                                {fighter[0].number}
                                            </TableCell>
                                            <TableCell size='small' width="23%" sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}}>
                                                <div className="cell-name-small">{fighter[0].last_name} {fighter[0].first_name[0]}. {fighter[0].patronymic[0]}.</div>
                                            </TableCell>
                                            <TableCell size='small' width="23%" sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}}>
                                                <div className="cell-club-small">{fighter[0].club.name}</div>
                                            </TableCell>
                                            <TableCell size='small' width="4%" sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}}>
                                                {fighter[1].number}
                                            </TableCell>
                                            <TableCell size='small' width="23%" sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}}>
                                                <div className="cell-name-small">{fighter[1].last_name} {fighter[1].first_name[0]}. {fighter[1].patronymic[0]}.</div>
                                            </TableCell>
                                            <TableCell size='small' width="23%" sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}}>
                                                <div className="cell-club-small">{fighter[1].club.name}</div>
                                            </TableCell>
                                    </TableRow>
                            )
                        })}
                    </TableBody>
                  }
                  </>

            </Table>
        </TableContainer>
    </Grid>
  )
}

export default OrderOfTiltyard