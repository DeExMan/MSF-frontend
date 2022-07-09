import React, {useEffect, useState} from 'react'
import { Button, ButtonGroup, Box, Grid, FormControl, InputLabel,
    Select, MenuItem, Table, TableBody, TableCell, styled, 
    TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { mergeBreakpointsInOrder } from '@mui/system';


function FinalTable(props) {

    const [fightersByVP, setFightersByVP] = useState()
    const coefficient = [[1.5, 1, 0.8, 0.6, 0.4, 0.2],
                         [1, 0.8, 0.6, 0.4, 0.2, 0],
                         [0.8, 0.6, 0.4, 0.2, 0, 0],
                         [1.5, 1, 0.8, 0.6, 0.4, 0.2],
                         [1, 0.8, 0.6, 0.4, 0.2, 0],
                         [0.8, 0.6, 0.4, 0.2, 0, 0],
                         [0.8, 0.6, 0.4, 0.2, 0, 0],
                         [0.8, 0.6, 0.4, 0.2, 0, 0],
                         [0.8, 0.6, 0.4, 0.2, 0, 0],
                         [0.8, 0.6, 0.4, 0.2, 0, 0],
                         [0, 0, 0, 0, 0, 0],]

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));

    useEffect(() =>{
        let data = props.fighterList
        data.sort(compareNumericOrder)
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            let VictoryScore = 0;
            let z = 0;

            switch (i){
                case 0:
                    VictoryScore = 4
                    break;
                case 1:
                    VictoryScore = 2
                    break;
                case 2:
                    VictoryScore = 1
                    break;
                default: VictoryScore = 0;
            }

            switch (props.tiltyard.league){
                case "лига A++":
                    z=1
                break;
                case 'лига A+':
                    z=2
                break;
                case 'лига A':
                    z=3
                break;
                case 'лига B':
                    z=4
                break;
                case 'лига C':
                    z=5
                break;
                case 'лига D':
                    z=6
                break;    
            }
            console.log(coefficient[data[i].category][z])
            let f = (data[i].victoryPoints + VictoryScore) * coefficient[data[i].category][z]
            console.log(data[i], f)
            data[i].rating += f
            data[i][0] = f
        }
        setFightersByVP(data)
    }, [])

    function compareNumericOrder(a, b) {
        if (a.victoryPoints > b.victoryPoints) return -1;
        if (a.victoryPoints == b.victoryPoints) return 0;
        if (a.victoryPoints < b.victoryPoints) return 1;
      }


  return (
    <>
        <h4 align = {"center"}>Результаты</h4>
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
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            Количество побед
                        </TableCell>
                        {/* <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            Заработанный рейтинг
                        </TableCell> */}
                        <TableCell sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                            Новый рейтинг
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fightersByVP && fightersByVP.map((fighter, fightersIndex) => {
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
                                <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                    <div align="left" className='cell-club'>
                                    {fighter.victoryPoints}
                                    </div>
                                </TableCell>
                                {/* <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                    <div align="left" className='cell-club'>
                                    {fighter.victoryPoints}
                                    </div>
                                </TableCell> */}
                                <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                    <div align="left" className='cell-club'>
                                    {fighter.rating}
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

export default FinalTable