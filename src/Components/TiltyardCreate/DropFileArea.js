import React, {useState} from 'react'
import { TableBody, TableCell, TableRow } from '@mui/material'

function DropFileAtea(props) {
  const [drag, setDrag] = useState(false)

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
    
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = (e) => {
    e.preventDefault()
    let file = e.dataTransfer.files[0];
    setDrag(false)
    props.readExcel(file)
  }

  return (
    <>
      {drag ?
      <TableBody sx={{width: "10%", height: "42vh", }}
      >
        <TableRow onDragLeave={e => dragLeaveHandler(e)}
      onDragOver={e =>dragStartHandler(e)}
      onDrop={e => onDropHandler(e)} >
        <TableCell sx={{borderLeft: "3px dashed #CCD1DD", borderBottom: "3px dashed #CCD1DD", borderTop: "3px dashed #CCD1DD", borderBottomLeftRadius: "20px"}}></TableCell>
        <TableCell sx={{color:"#CCD1DD", borderBottom: "3px dashed #CCD1DD", borderTop: "3px dashed #CCD1DD"}}  align="center">Отпустите файл здесь для загрузки</TableCell>
        <TableCell sx={{color:"#CCD1DD", borderBottom: "3px dashed #CCD1DD", borderTop: "3px dashed #CCD1DD"}}  align="center"></TableCell>
        <TableCell sx={{borderRight: "3px dashed #CCD1DD", borderBottom: "3px dashed #CCD1DD", borderTop: "3px dashed #CCD1DD", borderBottomRightRadius: "20px"}}></TableCell> 
        </TableRow>
        
      </TableBody>
      
      :
      <TableBody>
        <TableRow sx={{width: "10%", height: "42vh", }}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e =>dragStartHandler(e)}>
        <TableCell sx={{borderLeft: "3px solid #CCD1DD", borderBottom: "3px solid #CCD1DD", borderTop: "3px solid #CCD1DD", borderBottomLeftRadius: "20px"}}></TableCell>
        <TableCell sx={{color:"#CCD1DD", borderBottom: "3px solid #CCD1DD", borderTop: "3px solid #CCD1DD", }}  align="center" >Перетащите excel файл со списком бойцов сюда</TableCell> 
        <TableCell sx={{color:"#CCD1DD", borderBottom: "3px solid #CCD1DD", borderTop: "3px solid #CCD1DD", }}  align="center" ></TableCell> 
        <TableCell sx={{borderRight: "3px solid #CCD1DD", borderBottom: "3px solid #CCD1DD", borderTop: "3px solid #CCD1DD", borderBottomRightRadius: "20px"}}></TableCell>
        </TableRow>
      </TableBody>
      }
    </>
  )
}

export default DropFileAtea