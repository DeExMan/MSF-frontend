import React, { useState, useEffect } from 'react'
import {Table, TableBody, TableCell, Grid, styled, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function MiniBattleOrder(props) {
    const [battleOrder, setBattleOrder] = useState([])

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    
    textAlign: 'center',
    color: "white",
    background: "#323846",
    boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
    borderRadius: "20px",
}));

      useEffect(() =>{
    let i = props.stage;
    let p = []
    let data= props.battleOrder
    for (let z=0; z<data; z++){
      if(data[z].stage === i)
        p.push(data[z])
    }
    setBattleOrder(data.reverse())
  }, [])

  return (
    <TableContainer onClick={e => e.stopPropagation()}  sx={{
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
  marginTop: "55px",
  marginBottom: "15px",
      },
      "&::-webkit-scrollbar-thumb": {
  webkitBorderRadius: "10px",
  borderRadius: "10px",
  background: "#CCD1DD", 
  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
  }, maxHeight: "35vh", minHeight: "25vh", maxWidth: "80%"  }} component={Item}>
      <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
                  {/* <TableCell  sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                      №
                  </TableCell> */}
                  <TableCell size='small'  sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="left" style={{  }} >
                      Фамилия
                  </TableCell>
                  <TableCell  size='small'  sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="center" style={{  }} >
                      Счет
                  </TableCell>
                  <TableCell  size='small'sx={{backgroundColor:"#3B414E", color:"#CCD1DD", borderBottom: "2px solid #C2C2C2" }} align="right" style={{  }} >
                    Фамилия
                  </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {battleOrder.map((pair, fightersIndex) => {
                  return (
                      <TableRow key={pair.id}> 
                              {/* <TableCell  size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                              color:"white", textOverflow: "ellipsis", borderBottom: "none" }} align="left">
                                  {pair.Order}
                              </TableCell> */}
                              <TableCell size='small'  sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                              color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="left">
                                  <div  className="cell-name-small">{pair.left_fighter.last_name}</div>
                              </TableCell>
                              <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                              color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="center">
                                  {pair.left_scores}:{pair.right_scores}
                              </TableCell>
                              <TableCell size='small'  sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                              color:"white", textOverflow: "ellipsis", borderBottom: "none"}}  align="right">
                                  <div  className="cell-name-small">{pair.right_fighter.last_name}</div>
                              </TableCell>
                      </TableRow>
                  )})}
          </TableBody>
      </Table>
  </TableContainer>
  )
}

export default MiniBattleOrder