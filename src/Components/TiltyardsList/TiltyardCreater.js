import React, {useState} from 'react'
import { TextField, Button, Box, Grid, FormControl, InputLabel,
    Select, MenuItem, Dialog, DialogTitle, DialogContent,
    DialogActions, Slide, Container, Alert, Snackbar} from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TiltyardCreater(props) {
    const [referees] = useState(props.referees)
    const [open, setOpen] = useState(false);
    const [isRequiredFieldsError, setIsRequiredFieldsError] = useState(false)

    const [name, setName] = useState('')
    const [nomination, setNomination] = useState('')
    const [age_category, setAge] = useState('')
    const [league, setLeague] = useState('')
    const [referee, setReferee] = useState('')
    
    const handleClickOpen = () => {
            setOpen(true);
            var x = Number(props.tiltyardCount)
            setName(`Ристалище №${x+1}`)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkRequiredField = () => {
        if (!(name!=='' && nomination && age_category && league && referee !== '')) {
            setIsRequiredFieldsError(true);
            return true;
        }
        ;
        setIsRequiredFieldsError(false);
        return false;
    }

    const insertTiltyard = () => {
        if (checkRequiredField()){
            return
        }

    };

  return (
    <>
        <div style={{textAlign:"center"}}>
            <Button  size ='large' variant="contained" color="success" onClick={handleClickOpen}>
            Новое ристалище
            </Button>
        </div>

        <div>
            <Dialog PaperProps={{style: { borderRadius: "20px" }}} fullWidth={false} open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <Container sx={{backgroundColor:" #262E3E", color:"white", }}>
                    <DialogTitle  sx = {{fontSize:'h1', textAlign:"center"}}>{name}</DialogTitle>
                        <DialogContent sx={{color:"white"}}>
                            <Grid container spacing={0}
                            direction="column"
                            justifyContent="center"
                            alignItems="center">
                                {/* Выбор номинации */}
                                <Grid item xs={6} md={6}>
                                    <h2>
                                        <FormControl error ={isRequiredFieldsError    ? true : false } sx={{backgroundColor: "#3B414E",
                                        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                                        borderRadius: "10px",}} style={{width: 300}}>
                                            <InputLabel sx={{color:'#CCD1DD'}}    id="nominationID">Номинация</InputLabel>
                                            <Select
                                            sx={{color:'#CCD1DD'}}
                                            labelId="nominationID"
                                            id="nomination"
                                            value={nomination}
                                            label="Номинация"
                                            onChange={(e) => setNomination(e.target.value)}
                                            >
                                                <MenuItem value={'Щит-меч'}>Щит-меч</MenuItem>
                                                <MenuItem value={'Триатлон'}>Триатлон</MenuItem>
                                                <MenuItem value={'Сабля-баклер'}>Сабля-баклер</MenuItem>
                                                <MenuItem value={'Восточный щит'}>Восточный щит</MenuItem>
                                                <MenuItem value={'Щит-меч женщины'}>Щит-меч женщины</MenuItem>
                                                <MenuItem value={'Триатлон женщины'}>Триатлон женщины</MenuItem>
                                                <MenuItem value={'Сабля-баклер женщины'}>Сабля-баклер женщины</MenuItem>
                                                <MenuItem value={'Восточный щит женщины'}>Восточный щит женщины</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </h2>
                                </Grid>


                                {/* Выбор возростной категории */}
                                <Grid item xs={3} md={3}>
                                    <h2>
                                        <FormControl error ={isRequiredFieldsError    ? true : false } sx={{backgroundColor: "#3B414E",
                                        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                                        borderRadius: "10px",}} style={{width: 300}}>
                                            <InputLabel sx={{color:'#CCD1DD'}}  id="ageID">Возрастная категория</InputLabel>
                                            <Select
                                            sx={{color:'#CCD1DD'}}
                                            labelId="ageID"
                                            id="age"
                                            value={age_category}
                                            label="Возрастная категория"
                                            onChange={(e) => setAge(e.target.value)}
                                            >
                                                <MenuItem value={'4-5 лет'}>4-5 лет</MenuItem>
                                                <MenuItem value={'6-7 лет'}>6-7 лет</MenuItem>
                                                <MenuItem value={'8-9 лет'}>8-9 лет</MenuItem>
                                                <MenuItem value={'10-11 лет'}>10-11 лет</MenuItem>
                                                <MenuItem value={'12-13 лет'}>12-13 лет</MenuItem>
                                                <MenuItem value={'14-15 лет'}>14-15 лет</MenuItem>
                                                <MenuItem value={'16-17 лет'}>16-17 лет</MenuItem>
                                                <MenuItem value={'18-25 лет'}>18-25 лет</MenuItem>
                                                <MenuItem value={'25-39 лет'}>25-39 лет</MenuItem>
                                                <MenuItem value={'40+ лет'}>40+ лет</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </h2>
                                </Grid>


                                {/* Выбор лиги */}
                                <Grid item xs={3} md={3}>
                                    <h2>
                                        <FormControl error ={isRequiredFieldsError    ? true : false } sx={{backgroundColor: "#3B414E",
                                        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                                        borderRadius: "10px",}} style={{width: 300}}>
                                            <InputLabel sx={{color:'#CCD1DD'}} id="leagueID">Лига</InputLabel>
                                            <Select
                                            sx={{color:'#CCD1DD'}}
                                            labelId="leagueID"
                                            id="league"
                                            value={league}
                                            label="Лига"
                                            onChange={(e) => setLeague(e.target.value)}
                                            >
                                                <MenuItem value={'лига А'}>лига А</MenuItem>
                                                <MenuItem value={'лига Б'}>лига Б</MenuItem>
                                                <MenuItem value={'лига Д'}>лига Д</MenuItem>
                                                <MenuItem value={'лига О'}>лига О</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </h2>
                                </Grid>


                                {/* Выбор судьи */}  
                                {referees &&
                                <Grid item xs={3} md={3}>
                                    <h2>
                                        <FormControl error ={isRequiredFieldsError    ? true : false } sx={{backgroundColor: "#3B414E",
                                        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                                        borderRadius: "10px",}} style={{width: 300}}>
                                            <InputLabel sx={{color:'#CCD1DD'}} id="refereeID">Судья</InputLabel>
                                            <Select
                                            sx={{color:'#CCD1DD'}}
                                            labelId="refereeID"
                                            id="referee"
                                            value={referee}
                                            label="Судья"
                                            onChange={(e) => setReferee(e.target.value)}
                                            required
                                            >
                                                {(referees.map ((refereeChoice, i ) => (
                                                    <MenuItem key={refereeChoice.id} value={refereeChoice.id}>{refereeChoice.last_name}</MenuItem>
                                                )))}  
                                            </Select>
                                        </FormControl>
                                    </h2>
                                </Grid>}
                            </Grid>   
                        </DialogContent>

                        <DialogActions>
                            <Grid container spacing={0}>
                    <Grid item xs={6} sx={{textAlign:"left"}}>
                        <Button  variant="contained" color="success" onClick={() => insertTiltyard()}>
                            Сохранить
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:"right"}}>
                        <Button  onClick={handleClose} variant="contained" color="error" >
                            Назад
                        </Button>
                    </Grid>
                            </Grid>

                            <Snackbar open={isRequiredFieldsError} autoHideDuration={3000} onClose={() => setIsRequiredFieldsError(false)}>                  
                                <Alert severity="error">Проверьте все ли поля заполнены</Alert>
                            </Snackbar>
                        </DialogActions>
                </Container>
            </Dialog>
        </div>
    </>
  )
}

export default TiltyardCreater