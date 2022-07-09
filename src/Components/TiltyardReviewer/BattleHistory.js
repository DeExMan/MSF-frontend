import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Box, Grid, FormControl, InputLabel,
  Select, MenuItem, Table, TableBody, TableCell, styled, 
  TableContainer, TableHead, TableRow, Paper, Grow, Modal, Slide, Container, Typography, Backdrop  } from '@mui/material';
import MiniBattleOrder from './MiniBattleOrder';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BattleHistory(props) {
  const [stages, setStage] = useState([1, 2, 3, 4, 5, 6, 7])

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    
    textAlign: 'center',
    color: "white",
    background: "#323846",
    boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
    borderRadius: "20px",
}));

  // useEffect(() =>{
  //   let i = props.stage;
  //   let data= []
  //   for (let z=0; z<i; z++){
  //     data.push(z+1)
  //   }
  //   setStage(data.reverse())
  // }, [])

  return (
    <Backdrop
    open={props.open}
    onClick={props.handleClose}
    sx={{position:"fixed", overflowY: "auto",  backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    zIndex: (theme) => theme.zIndex.drawer + 1, position: "fixed",
    height: "100vh"
    }}
    >
      <Container sx={{height: "100vh",}} maxWidth='xl'  >
        
        <Box sx={{ flexGrow: 1}}>
        <Grid container  justifyContent="space-between" alignItems="center" spacing={3}>
          

            {stages.map((s, sIndex) => (
              <Grow
              key={sIndex}
              in={props.open}
              style={{ transformOrigin: '0 0 0' }}
              {...(props.open ? { timeout: 1000*(s/3) } : {})}
              >
                <Grid item xs={12} md={4}  container justifyContent="center">
                  <h2 align = {"center"}><b>Стадия {s}</b></h2>
                  <MiniBattleOrder  stage={s} battleOrder={props.battleOrder}/>
                </Grid>
              </Grow>
            ))}
          
        </Grid>
        </Box>
        <br/>
      </Container>
      
    </Backdrop>
  )
}

export default BattleHistory