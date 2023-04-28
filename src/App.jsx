import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Edit, Delete, Add} from '@mui/icons-material'
import { Grid, IconButton, tableCellClasses, TableCell, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, Typography, Button, TextField, Box, Alert} from '@mui/material';

const App = () => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));  

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showWarningAlert2, setShowWarningAlert2] = useState(false);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [solicitud, setSolicitud] = useState("");
    const [comentario, setComentario] = useState("");
    const [data, setData] = useState([]);
    const [idform, setIdform] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const onChangeNombre = (e) => {setNombre(e.target.value)}
    const onChangeCorreo = (e) => {setCorreo(e.target.value)}
    const onChangeTelefono = (e) => {setTelefono(e.target.value)}
    const onChangeSolicitud = (e) => {setSolicitud(e.target.value)}
    const onChangeComentario = (e) => {setComentario(e.target.value)}
    const onNameChange = e => setNombre(e.target.value)
    const onEmailChange = e => setCorreo(e.target.value)
    const onCelphoneChange = e => setTelefono(e.target.value)
    const onRequestChange = e => setSolicitud(e.target.value)
    const onCommentChange = e => setComentario(e.target.value)
    const handleClose = () => {setOpen(false);};
    const handleClose2 = () => {setOpen2(false);};
    const handleClose3 = () => {setOpen3(false);};

    useEffect(()=>{
      getData()
    },[])

    const getData = async () => {
      try{
        const {data: response} = await axios.get('http://localhost:3055/form')
        setData(response)
      } catch (error) {
        console.log(error.message)
      }
    }
  
    const tableEdit = ((getTableData) => {
      setIdform(getTableData.idform)
      setNombre(getTableData.nombre)
      setCorreo(getTableData.correo)
      setTelefono(getTableData.telefono)
      setSolicitud(getTableData.solicitud)
      setComentario(getTableData.comentario)
      setOpen(true)
    })
  
    const tableDelete = ((getTableData) => {
      setIdform(getTableData.idform)
      setNombre(getTableData.nombre)
      setCorreo(getTableData.correo)
      setTelefono(getTableData.telefono)
      setSolicitud(getTableData.solicitud)
      setComentario(getTableData.comentario)
      setOpen2(true)
    })
  
    const modalAddTableData = () => {
      setOpen3(true)
    }
    const confirmedDelete = () => {
      axios.delete(`http://localhost:3055/delete-row/${idform}`).then(() =>{
      setOpen2(false)
      getData()
      setShowSuccessAlert2(true)
      showSuccessAlert2TimeOut()  
      })
    }
  
    const buttonUpdate = (() => {
      axios.put(`http://localhost:3055/update-row/${idform}`, {idform, nombre, correo, telefono, solicitud, comentario})
      .then(()=>{
        getData()
        setNombre("")
        setCorreo("")
        setTelefono("")
        setSolicitud("")
        setComentario("")
        setIdform("")
        setShowSuccessAlert(true)
        showSuccessAlertTimeOut()
        setOpen(false)
      })
    
    })
      
    const showSuccessAlert2TimeOut = () => {
      setTimeout(() => {
        setShowSuccessAlert2(false);
      }, 6000);
    }
    
    const addTableData = () =>{
      if (nombre === "" || correo === "" || telefono === "" || solicitud === "" || comentario === ""){
       setShowWarningAlert(true)
       showWarningAlertTimeOut()
      }else{
   
       axios.post('http://localhost:3055//send-form', {nombre, correo, telefono, solicitud, comentario})
       .then((response) => {
         setNombre("")
         setCorreo("")
         setTelefono("")
         setSolicitud("")
         setComentario("")
         setShowSuccessAlert(true)
         showSuccessAlertTimeOut()
       }).catch((error) => {
         console.log(error)
         setShowWarningAlert2(true)
         showWarningAlert2TimeOut()
       })
     }
    }
  
    const showWarningAlertTimeOut = () => {
      setTimeout(() => {
        setShowWarningAlert(false);
      }, 3000);
    }
    
    const showWarningAlert2TimeOut = () => {
      setTimeout(() => {
        setShowWarningAlert2(false);
      }, 3000);
    }
    
    const showSuccessAlertTimeOut = () => {
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  
    return (
      <div>
      <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar fila</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Termina de editar la fila y presiona actualizar
          </DialogContentText>

      <TextField sx={{m:1}} variant="filled" id="outlined-basic" label="Nombre" value={nombre} onChange={onNameChange}/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="Correo" value={correo} onChange={onEmailChange}/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="telefono" value={telefono} onChange={onCelphoneChange} type='number'/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="solicitud" value={solicitud} onChange={onRequestChange}/>
      <TextField sx={{m:.7}} variant="filled" id="outlined-basic" label="comentario" value={comentario} onChange={onCommentChange}/>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
      <Button onClick={buttonUpdate}>actualizar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>¿Estas seguro que deseas eliminar la fila?</DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Correo</StyledTableCell>
            <StyledTableCell align="center">Telefono</StyledTableCell>
            <StyledTableCell align="center">Solicitud</StyledTableCell>
            <StyledTableCell align="center">Comentario</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow key={idform}>
              <StyledTableCell component="th" scope="row">{idform}</StyledTableCell>
              <StyledTableCell align="center">{nombre}</StyledTableCell>
              <StyledTableCell align="center">{correo}</StyledTableCell>
              <StyledTableCell align="center">{telefono}</StyledTableCell>
              <StyledTableCell align="center">{solicitud}</StyledTableCell>
              <StyledTableCell align="center">{comentario}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
          <Button sx={{m:1}}  variant='outlined' onClick={handleClose2}>Cancelar</Button>
          <Button sx={{m:1}} variant='outlined' onClick={() => {confirmedDelete()}} startIcon={<Delete />}>Eliminar</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle>Agregar datos a la tabla</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Termina de llenar los campos y presiona enviar
          </DialogContentText>
      {showWarningAlert &&  <Alert severity="warning">Debes de llenar todos los campos</Alert>}
      {showWarningAlert2 && <Alert severity="warning">Ha ocurrido un error, revisa la consola para saber mas</Alert>}

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <TextField
            required
            label="Nombre"
            variant="outlined"
            placeholder='Dimitri'
            value={nombre}
            onChange={onChangeNombre}
            type='text'
            />
  
          <TextField
            required
            label="Correo"
            variant="outlined"
            placeholder='lagares.dimitri@gmail.com'
            value={correo}
            onChange={onChangeCorreo}
            type='email'
            />
  
          <TextField
            required
            label="Teléfono/Celular"
            variant="outlined"
            placeholder='3236642619'
            value={telefono}
            onChange={onChangeTelefono}
            type='number'
            />
  
          <TextField
            required
            label="Solicitud"
            variant="outlined"
            placeholder='Digita tu solicitud'
            value={solicitud}
            onChange={onChangeSolicitud}
            />
  
          <TextField
            required
            id="outlined-multiline-static"
            label="Comentario"
            multiline
            rows={4}
            placeholder="Por favor ingrese el comentario que deseas dejar"
            value={comentario}
            onChange={onChangeComentario}
          />
        </Box>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancelar</Button>
      <Button onClick={addTableData}>agregar datos a la tabla</Button>
        </DialogActions>
      </Dialog>

        {showSuccessAlert && <Alert severity="success">Actualizado correctamente</Alert>}
        {showSuccessAlert2 && <Alert severity="success">Eliminado correctamente</Alert>}
        {showWarningAlert &&  <Alert severity="warning">Debes de llenar todos los campos</Alert>}
        {showWarningAlert2 && <Alert severity="warning">Ha ocurrido un error, revisa la consola para saber mas</Alert>}
        {showSuccessAlert && <Alert severity="success">Se ha enviado la informacion correctamente</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography fontFamily={'century'} variant='h4' sx={{textAlign:'left', justifyContent:'center', m:1}}>Solicitudes</Typography>
          </Grid>

          <Grid item xs={4}>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{m: 'auto'}}
              onClick={modalAddTableData}
              startIcon={<Add />}>
              agregar datos a la tabla
              </Button>          </Grid>
        </Grid>
 
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Correo</StyledTableCell>
            <StyledTableCell align="center">Telefono</StyledTableCell>
            <StyledTableCell align="center">Solicitud</StyledTableCell>
            <StyledTableCell align="center">Comentario</StyledTableCell>
            <StyledTableCell align="center">Editar</StyledTableCell>
            <StyledTableCell align="center">Eliminar</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.idform}>
              <StyledTableCell component="th" scope="row">{row.idform}</StyledTableCell>
              <StyledTableCell align="center">{row.nombre}</StyledTableCell>
              <StyledTableCell align="center">{row.correo}</StyledTableCell>
              <StyledTableCell align="center">{row.telefono}</StyledTableCell>
              <StyledTableCell align="center">{row.solicitud}</StyledTableCell>
              <StyledTableCell align="center">{row.comentario}</StyledTableCell>
              <StyledTableCell align="center"><IconButton onClick={() => {tableEdit(row)}}><Edit/></IconButton></StyledTableCell>
              <StyledTableCell align="center"><IconButton onClick={() => {tableDelete(row)}}><Delete/></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    <div>
      </div>
      </div>
  )
}

export default App