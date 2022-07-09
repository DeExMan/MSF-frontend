import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import {Grid, Paper, Box, } from '@mui/material';
import {useNavigate } from 'react-router-dom';


function TiltyardBox(props) {

    const [tiltyard] = useState(props.tiltyard)
    const navigate = useNavigate()

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));

    const openTiltyardReviewer = (id) => {
        clearInterval(props.intervalId)
        navigate(`/TiltyardReviewer/${id}`)
    }

  return (
    <Grid direction="column" justifyContent="space-around"
    alignItems="center" key = {tiltyard.id} item xs={12} md={6}>
        <Item className='pointer' onClick={() => openTiltyardReviewer(tiltyard.id)}>
            <Grid justifyContent="space-around"
    alignItems="center" container spacing={4}>
                <Grid  item xs={6}>
                <h2><b>{tiltyard.name}</b></h2>
                </Grid>
                <Grid item xs={6} container justifyContent="center">
                    <>
                    <h2 style={{color: tiltyard.state.length > 4 ? '#FDA286' : '#FAFD86'}}>{tiltyard.state} </h2>
                    <div className={tiltyard.state.length > 4 ? 'd2' : 'd1'}></div>
                    </>
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{color:'#CCD1DD'}}>
                <Grid item xs={6} >
                    <h2 className='fw-normal'>Номинация:    </h2>
                </Grid>
                <Grid item xs={6}>
                    <h2 className='fw-light'>{tiltyard.nomination}</h2>
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{color:'#CCD1DD'}}>
                <Grid item xs={6} container justifyContent="left">
                    <h2 className='fw-normal'>Возрастная категория:    </h2>
                </Grid>
                <Grid item xs={6}>
                    <h2 className='fw-light'><p>{tiltyard.age_category}</p></h2>
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{color:'#CCD1DD'}}>
                <Grid item xs={6}>
                    <h2 className='fw-normal'>Лига:    </h2>
                </Grid>
                <Grid item xs={6}>
                    <h2 className='fw-light'>{tiltyard.league}</h2>
                </Grid>
            </Grid>
        </Item>
    </Grid>
  )
}

export default TiltyardBox