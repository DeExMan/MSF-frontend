import React, {useEffect, useState} from 'react'
import {Autocomplete, TextField, Button, Box, Grid, FormControl, InputLabel,
    Select, MenuItem, Dialog, DialogTitle, DialogContent,
    DialogActions, Slide, Container, Alert, Snackbar, getOptionSelected} from '@mui/material';
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FighterAdder(props) {
    const [open, setOpen] = useState(false);
    const [fighter, setFighter] =useState(null)

    const [isRequiredFieldsError, setIsRequiredFieldsError] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.freeFighters)
    };

    const checkRequiredField = () => {
        if (fighter === null) {
            setIsRequiredFieldsError(true);
            return true;
        };
        setIsRequiredFieldsError(false);
        return false;
    }

    const insertFighter = () => {
        if (checkRequiredField()){
            return
        }
        let data = []
        console.log(fighter)
        props.freeFighters.map((add, index) => {
            if(add !== fighter) {
                console.log(add)
                data.push(add)
            }
        })
        console.log(props.freeFighters)
        props.addFighter(fighter)
        props.setFreeFighters(data)
        setOpen(false);
        setFighter(null)
        
        
    }

    const handleClose = () => {
      setOpen(false);
    };
    
  return (
    <div>
        <Button disabled={props.showModal}  variant="contained" color="success" onClick={handleClickOpen}>
          + Добавить участника 
        </Button>

        <Dialog
        PaperProps={{style: { borderRadius: "20px" }}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx = {{borderRadius:'120'}}
      >
        <Container sx={{backgroundColor:" #262E3E", color:"white", }}>
        <DialogTitle sx = {{fontSize:'h1', textAlign:"center"}} >{"Новый боец"}</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={4}
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                  <br/>
                  {/* Фамилия */}
                  {props.freeFighters &&
                  
                  <Grid item xs={12} md={6}>
                  <Autocomplete
                  
                   value={fighter}
                   onChange={(event, newValue) => {;
                      setFighter(newValue)
                   }}
                    id="controllable-states-demo"
                    options={props.freeFighters}
                    getOptionLabel={(option) => `${option.last_name} ${option.first_name} ${option.patronymic}`}
                    isOptionEqualToValue = {(options, value) => options.first_name === value.first_name }
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error={isRequiredFieldsError} second_name="Фамилия" label = "Имя бойца" />}
                  />
                  </Grid>
                    }
                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
        <Grid container spacing={0}>
            <Grid sx={{textAlign:"left"}} item xs={6}>
            <Button  variant="contained" color="success" onClick={insertFighter}>Сохранить</Button>
            </Grid>
            <Grid sx={{textAlign:"right"}} item xs={6}>
            <Button  onClick={handleClose} variant="contained" color="error">Отмена</Button>
            </Grid>
        </Grid>
        </DialogActions>
        </Container>
      </Dialog>
    </div>
  )
}

export default FighterAdder