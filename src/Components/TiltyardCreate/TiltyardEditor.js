import React, {useState, useEffect,} from 'react'
import {useParams,} from 'react-router-dom';
import { Button, ButtonGroup, Box, Grid, FormControl, InputLabel,
    Select, MenuItem, Table, TableBody, TableCell, styled, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CustomLink } from '../Custom/CustomLink';
import { useAuth } from "../context/auth";
import {useUser} from "../context/user";
import DropFileArea from './DropFileArea';
import axios from 'axios';
import {Draggable, Droppable, DragDropContext} from 'react-beautiful-dnd'
import FighterAdder from './FighterAdder';
import {HomeSvgSelector} from '../Custom/HomeSvgSelector';
import * as XLSX from "xlsx";
import OrderOfTiltyard from './OrderOfTiltyard';
import Modal from './Modal';
import {useNavigate } from 'react-router-dom';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function TiltyardEditor() {
    const {length} = useParams();
    const {authTokens, setAuthTokens} = useAuth();
    const navigate = useNavigate()
    // const {user, setUser} = useUser();
    const [referees, setreferees] = useState();
    let   [fightersOfTiltyard, setFightersOfTiltyard] = useState();
    
    let [freeFighters, setFreeFighters] = useState();

    const [name, setName] = useState('')
    const [nomination, setNomination] = useState('')
    const [age_category, setAge] = useState('')
    const [league, setLeague] = useState('')
    const [referee, setReferee] = useState('')

    const [battleOrder, setBattleOrder] = useState([]);
    const [currentOrder, setCurrentOrder] = useState()
    let [i] = useState(0)

    const [formingError, setFormingError] = useState(false)
    const [alredyFormed, setAlredyFormed] = useState(false)

    const [progress, setProgress] = useState(10);
    const [showModal, setShowModal] = useState(false);


    useEffect(() =>{
        fetchReferee();
        window.onbeforeunload = function(e) {
            var dialogText = 'Вы уверены?';
            e.returnValue = dialogText;
            return dialogText;
          };
        setName(`Ристалище №${Number(length)+1}`)
    }, [])

    const fetchReferee = async () => {
        const referees = await axios.get('http://127.0.0.1:8000/api/referees/', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${authTokens}`
            },
        }).catch(error => console.log('error fetching tiltyards'))
        setreferees(referees.data)

        const fightersAll = await axios.get('http://127.0.0.1:8000/api/freeFighters/', {
            headers: {
                'content-type': 'application/json',
            },
        }).catch(error => console.log('error fetching tiltyards'))
        setFreeFighters(fightersAll.data)
        
    }

    const back =() => {
        window.onbeforeunload = function(e) {
            var dialogText = 'Вы уверены?';
            e.returnValue = dialogText;
            return dialogText;
          };
    }

    const addFighter = (fighter) => {
        console.log(fighter)
        const data = []
        if(fightersOfTiltyard){
            fightersOfTiltyard.map(e => data.push(e))
        }
        data.push(fighter)
        setFightersOfTiltyard(data)
        setFormingError(true)
        
    }

    const deleteFighter = (fighter) => {
        fightersOfTiltyard.splice(fightersOfTiltyard.find(item => item.id == fighter.id), 1)
        let data = []
        freeFighters.map(x => {
            data.push(x)
        })
        data.push(fighter)
        setFreeFighters(data)
        setFormingError(true)
        if(alredyFormed)
            formingFights()
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        
        textAlign: 'center',
        color: "white",
        background: "#323846",
        boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
    }));

    const getItemStyle = (isDragging, draggableStyle) => ({
        
        ...draggableStyle,
        
        TableCell: {
            minWidth: "1000px",
          },
    })

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file)
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
        promise.then((d) => {
            formingFightersList(d)
        });
    };

    const formingFightersList = (data) => {
        let indexDelete =[]
        let finalData = []
        console.log(freeFighters)
        console.log(data)
        freeFighters.map((freeFighter, x) => {
            data.map((excelFighter, z) => {
                if( 
                    freeFighter.first_name === excelFighter.Имя &&
                    freeFighter.last_name === excelFighter.Фамилия &&
                    freeFighter.patronymic === excelFighter.Отчество
                ) {
                    finalData.push(freeFighter)
                    indexDelete.push(x)
                }
                    
            })
        })
        console.log(freeFighters)
        indexDelete.reverse();
        indexDelete.map(id =>{
            console.log(id)
            freeFighters.splice(id,1)
        })
        setFreeFighters(freeFighters)
        setFightersOfTiltyard(finalData)
    }

    const onDragEnd = result => {
        const {destination, source, draggableId} = result;
    
        if(!destination) {
            return;
        }
    
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
    
        // const start = source.droppableId;
        // const finish = destination.droppableId;
        // console.log(start, finish)
        
        // if(start === finish) {
            const newFighterRow = Array.from(fightersOfTiltyard);
            const fighter = fightersOfTiltyard[source.index]
            newFighterRow.splice(source.index, 1)
            newFighterRow.splice(destination.index, 0, fighter);

            fightersOfTiltyard = newFighterRow;
            setFormingError(true)
        // }
        
        // const startTaskIds = Array.from(allFighters)
        // const fighter = allFighters[source.index]
        // startTaskIds.splice(source.index, 1)

        // const finishTaskIds = Array.from(battleOrder)
        // finishTaskIds.splice(destination.index, 0, fighter)

        // allFighters = startTaskIds;
        // battleOrder = finishTaskIds
    }

    const formingFights = () => {
        let fighters = fightersOfTiltyard;
        let data = [4,3];
        console.log(fighters.length)

        if(fighters.length <= 8){
            for(let t = 0; t <= 1; t++)
                for(let z = 0; z <= 1; z++)
                    if(data[t]+data[z] == fighters.length){
                            multiple(data[t], fightersOfTiltyard)
                            multiple(data[z], fightersOfTiltyard)
                            i = 0
                            t = 1       
                    }
        }
        else if(fighters.length <= 12) {
            for(let f = 0; f <= 1; f++)
                for(let t = 0; t <= 1; t++)
                    for(let z = 0; z <= 1; z++)
                        if(data[f]+data[t]+data[z] == fighters.length){
                                multiple(data[f], fightersOfTiltyard)
                                multiple(data[t], fightersOfTiltyard)
                                multiple(data[z], fightersOfTiltyard)
                                i = 0
                                f = 1
                        }
        }
        else if(fighters.length <= 16) {
            for(let p = 0; p <= 1; p++)
                for(let f = 0; f <= 1; f++)
                    for(let t = 0; t <= 1; t++)
                        for(let z = 0; z <= 1; z++)
                            if(data[p]+data[f]+data[t]+data[z] == fighters.length){
                                    multiple(data[p], fightersOfTiltyard)
                                    multiple(data[f], fightersOfTiltyard)
                                    multiple(data[t], fightersOfTiltyard)
                                    multiple(data[z], fightersOfTiltyard)
                                    i = 0
                                    p = 1
                            }
        }
        else if(fighters.length == 17){
            console.log("eh")
        }
        else if(fighters.length <= 24) {
            for(let r = 0; r <= 1; r++)
                for(let m = 0; m <= 1; m++)    
                    for(let p = 0; p <= 1; p++)
                        for(let f = 0; f <= 1; f++)
                            for(let t = 0; t <= 1; t++)
                                for(let z = 0; z <= 1; z++)
                                    if(data[r]+data[m]+data[p]+data[f]+data[t]+data[z] == fighters.length){
                                        multiple(data[r], fightersOfTiltyard)
                                        multiple(data[m], fightersOfTiltyard)
                                        multiple(data[p], fightersOfTiltyard)
                                        multiple(data[f], fightersOfTiltyard)
                                        multiple(data[t], fightersOfTiltyard)
                                        multiple(data[z], fightersOfTiltyard)
                                        i = 0
                                        m = 1
                                        p = 1
                                        f = 1
                                        t = 1
                                        z = 1
                                        r = 1
                                    }
        }
        else if(fighters.length <= 32){
            for(let q = 0; q <= 1; q++)
                for(let y = 0; y <= 1; y++)
                    for(let r = 0; r <= 1; r++)
                        for(let m = 0; m <= 1; m++)    
                            for(let p = 0; p <= 1; p++)
                                for(let f = 0; f <= 1; f++)
                                    for(let t = 0; t <= 1; t++)
                                        for(let z = 0; z <= 1; z++)
                                            if(data[q]+data[y]+data[r]+data[m]+data[p]+data[f]+data[t]+data[z] == fighters.length){
                                                    multiple(data[q], fightersOfTiltyard)
                                                    multiple(data[y], fightersOfTiltyard)
                                                    multiple(data[r], fightersOfTiltyard)
                                                    multiple(data[m], fightersOfTiltyard)
                                                    multiple(data[p], fightersOfTiltyard)
                                                    multiple(data[f], fightersOfTiltyard)
                                                    multiple(data[t], fightersOfTiltyard)
                                                    multiple(data[z], fightersOfTiltyard)
                                                    i = 0
                                                    m = 1
                                                    p = 1
                                                    f = 1
                                                    t = 1
                                                    z = 1
                                                    r = 1
                                                    y = 1
                                                    q = 1   
                                                }   
        }
        setCurrentOrder(battleOrder)
        setBattleOrder([])
        setFormingError(false)
        setAlredyFormed(true)
    }

    const multiple = (x, fighter) => {
        if(x === 3){
            const res = fighter.slice(i, i + 3);
            battleOrder.push([res[0], res[1]])
            battleOrder.push([res[2], res[1]])
            battleOrder.push([res[2], res[0]])
            i = i + 3
        }
        else if (x === 4){
            console.log(battleOrder)
            const res = fighter.slice(i,  i + 4);
            battleOrder.push([res[0], res[1]])
            battleOrder.push([res[2], res[1]])
            battleOrder.push([res[2], res[3]])
            battleOrder.push([res[0], res[3]])
            battleOrder.push([res[0], res[2]])
            battleOrder.push([res[1], res[3]])
            i = i + 4
            console.log(battleOrder)
        }
        console.log(battleOrder)
    }

    const save = async () => {
        setShowModal(true)
        const referees = await axios.post('http://127.0.0.1:8000/api/tiltyards/', {
            name: name,
            nomination: nomination,
            age_category: age_category,
            league: league,
            state: "Идет",
            referee: referee,
            stage: 1
        }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${authTokens}`
            },
        }).then(result1 => {
            if (result1.status === 201) {
                setProgress(40)
                console.log(result1)
                fightersOfTiltyard.map(fighter => {
                    axios.put(`http://127.0.0.1:8000/api/users/${fighter.id}/`,{
                        number: fighter.number,
                        tiltyard: result1.data.id,
                        stage: 1
                    }, {
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Token ${authTokens}`
                        },
                    }).then(result => {
                        if (result.status === 200) {
                            console.log(result)
                            setProgress(70)
                        }   
                }).catch(error => console.log(error))
                })
                currentOrder.map((pair, index) => {
                    console.log(pair)
                    console.log(pair[0].id)
                    console.log(pair[1].id)
                    console.log( result1.data.tiltyard)
                    console.log(index+1)
                    axios.post(`http://127.0.0.1:8000/api/battleOrder/`, {
                    left_fighter: pair[0].id,
                    right_fighter: pair[1].id,
                    Tiltyard: result1.data.id,
                    Order: index+1,
                }).then(result => {
                    if(result.status === 201) {
                        console.log(result)
                        setProgress(100)
                        setTimeout(navigate('/'), 1000)
                    }
                })
                })
            }
        
        }).catch(error => console.log(error))
        

    }
  
  return (
    <>
        {/* Шапка */}
        {name &&
        <Box sx={{ flexGrow: 1}}>
            <Grid container alignItems="center" spacing={1} >   
                <Grid item xs={4} md={4}  container justifyContent="left">
                    <CustomLink onClick ={() => back()} variant="contained" color="error" disabled={showModal} to={'/'} >
                        К списку
                    </CustomLink>           
                </Grid>
                <Grid item xs={4} md={4} sx = {{fontSize:36, textAlign: "center"}}  container justifyContent="center">
                    <h1 className='textUpper'><b>{name}</b></h1>          
                </Grid>
                <Grid item xs={4} md={4} container justifyContent="right">
                    <h3 style={{color:'#FDA286'}}>Подготовка</h3>  
                    <p className='d3'></p>
                </Grid>
            </Grid>
        </Box>
        }

        {/* Информация о ристалище error ={isRequiredFieldsError    ? true : false }*/}
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={3} md={3} sx = {{fontSize:36, textAlign: "center"}} >
                        <h2>
                            <FormControl  sx={{backgroundColor: "#3B414E",
                            boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                            borderRadius: "10px",}} style={{width: "90%"}}>
                                <InputLabel sx={{color:'#CCD1DD'}} id="nominationID">Номинация</InputLabel>
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
                <Grid item xs={3} md={3} sx = {{fontSize:36, textAlign: "center"}}>
                        <h2>
                            <FormControl sx={{backgroundColor: "#3B414E",
                            boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                            borderRadius: "10px",}} style={{width: "90%"}}>
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
                <Grid item xs={3} md={3} sx = {{fontSize:36, textAlign: "center"}}>
                        <h2>
                            <FormControl sx={{backgroundColor: "#3B414E",
                            boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                            borderRadius: "10px",}} style={{width: "90%"}}>
                                <InputLabel sx={{color:'#CCD1DD'}} id="leagueID">Лига</InputLabel>
                                <Select
                                sx={{color:'#CCD1DD'}}
                                labelId="leagueID"
                                id="league"
                                value={league}
                                label="Лига"
                                onChange={(e) => setLeague(e.target.value)}
                                >
                                    <MenuItem value={'лига A++'}>лига A++</MenuItem>
                                    <MenuItem value={'лига A+'}>лига A+</MenuItem>
                                    <MenuItem value={'лига A'}>лига A</MenuItem>
                                    <MenuItem value={'лига B'}>лига B</MenuItem>
                                    <MenuItem value={'лига C'}>лига C</MenuItem>
                                    <MenuItem value={'лига D'}>лига D</MenuItem>
                                </Select>
                            </FormControl>
                        </h2>
                        
                </Grid>
                <Grid item xs={3} md={3} sx = {{fontSize:36, textAlign: "center"}}>
                        {referees &&
                            <h2>
                                <FormControl sx={{backgroundColor: "#3B414E",
                                boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
                                borderRadius: "10px",}} style={{width: "90%"}}>
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
                        }
                </Grid>  
            </Grid>
        </Box>
        
        {/* Таблицы и элементы управления */}
        {freeFighters &&
        <>
            <Box sx={{ flexGrow: 1}}>      
                <Grid container  justifyContent="space-between" alignItems="center" spacing={3}>

                    {/* Список бойцлв */}
                    
                    <Grid item xs={5} md={5}  container justifyContent="center">
                        <h4 align = {"center"}>БОЙЦЫ</h4>
                        <DragDropContext onDragEnd={onDragEnd}>
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
                        
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {typeof(fightersOfTiltyard) !== "undefined" && (fightersOfTiltyard.length !== 0) ? 
                                    <Droppable droppableId="table">
                                        {(provided, snapshot) => (
                                        
                                            <TableBody
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}>
                                                {fightersOfTiltyard.map((fighter, fightersIndex) => {
                                                    return (
                                                        // list of task
                                                    <Draggable 
                                                    draggableId={fighter.id.toString()} 
                                                    index={fightersIndex} 
                                                    key={fighter.id}>
                                                    {(provided, snapshot) => (
                                                    
                                                        <TableRow
                                                        {...provided.draggableProps}
                                                        
                                                        ref={provided.innerRef}
                                                        sx={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        кеу={fighter.id}> 
                                                            <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" scope="row">
                                                                <div {...provided.dragHandleProps} align="center" style={{backgroundColor: "#1DB970", borderRadius: "4px", width:"40px", opacity:"90%"}}>
                                                                {fighter.number = Number(fightersIndex+1) }
                                                                </div>
                                                                
                                                            </TableCell>
                                                            <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                                            color:"white",  textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                                                <div align="left" className='cell-name'>
                                                                {fighter.last_name} {fighter.first_name[0]}. {fighter.patronymic[0]}.
                                                                </div>
                                                        
                                                            </TableCell>
                                                            <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                                                <div align="left" className='cell-club'>
                                                                {fighter.club.name}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell size='small' sx={{ backgroundColor: (fightersIndex%2 !== 0) ? "#3B414E" : "#323846", 
                                                            color:"white", textOverflow: "ellipsis", borderBottom: "none"}} component="th" align="left">
                                                                <div className='close' onClick={() => deleteFighter(fighter)}/>
                                                            </TableCell>
                                                        </TableRow>

                                                        
                                                    )} 

                                                    </Draggable>);
                                                })}
                                                {provided.placeholder}
                                                {/* <TableRow align="center" sx={{backgroundColor:"white"}}>
                                                        hi
                                                </TableRow> */}
                                            </TableBody>
                                        )}
                                    </Droppable> 
                                    : 
                                    <DropFileArea readExcel={readExcel}/>
                                }
                            </Table>
                            </TableContainer>
                        </DragDropContext>
                    </Grid>
                    

                    {/* Формирование боев */}
                    
                    <OrderOfTiltyard currentOrder={currentOrder}/>



                </Grid>  
            </Box>
            {showModal ?  
            <Modal showModal={showModal} setShowModal={setShowModal} value={progress}/>
            : <br/>
            }
            
            <Box sx={{ flexGrow: 1}}>
                <Grid container  justifyContent="space-between" alignItems="center" spacing={3}>
                    <Grid item xs={5} md={5}  container justifyContent="center">
                        <FighterAdder showModal={showModal} freeFighters={freeFighters} setFreeFighters={setFreeFighters} addFighter = {addFighter} fightersOfTiltyard={fightersOfTiltyard}/>
                    </Grid>
                    <Grid item xs={5} md={5}  container justifyContent="left">
                        {console.log(fightersOfTiltyard)}
                        <Button disabled={!(typeof(fightersOfTiltyard) !== "undefined" && fightersOfTiltyard.length > 5) || showModal} variant="contained" color="success" onClick={() => {formingFights()}}>Сформировать Бои</Button>
                    </Grid>
                    <Grid item xs={2} md={2}  container justifyContent="right">
                        <Button onClick={()=>save()} 
                        disabled={((!alredyFormed && !nomination && !age_category && !league && !referee) || formingError) || showModal} 
                        variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
        }
        <div div className={showModal ? "modal" : ""}/>
    </>
  )
}

export default TiltyardEditor