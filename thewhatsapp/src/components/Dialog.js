import React ,{  useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Fab} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import db from '../firebase';
import './Dialog.css';
import useStorage from './useStorage';
import Progressbar from './Progressbar';

export default function FormDialog() {

  const [open, setOpen] =useState(false);
  const [emaisl,setEmaisl]=useState("");
  const [imgsrc,setImgsrc]=useState("");
  const [roomName,setRoomName]=useState("");
  const [imgErr, setImgErr] = useState("");

  const imgTypes=['image/png','image/jpeg'];
  const changedFile = (e)=>{
   let selected = e.target.files[0];
    
   if(selected && imgTypes.includes(selected.type)){
     setImgsrc(selected);
     setImgErr("");
   }
   else{
     setImgsrc(null);
     setImgErr("Please select a valid image-file-type.(png/jpeg)")
   }
  }

  const handleClickOpen = () => {
    setOpen(true);
   
  };
  

  const handleClose = () => {
    
    if (emaisl,imgsrc,roomName){
        db.collection("rooms").add({
        name:roomName ,  
        email:emaisl,
        img:imgsrc,
     })
    }
    setOpen(false);
    
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <Fab title="add new room" size="medium"><PersonAddIcon/></Fab>

      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CREATE-THEroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a room fill the following field and refresh after submiting it
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="RoomName"
            label="RoomName"
            type="text"
            fullWidth
            onChange={(e)=>{setRoomName(e.target.value)}}
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e)=>{setEmaisl(e.target.value)}}
          />
          <input
          type="file"
          id="imgsrc"
          onChange={changedFile}
          />
          <div className="output">
            {imgErr && <div className="error">{imgErr}</div>}
            {imgsrc && <Progressbar  imgsrc={imgsrc} setImgsrc={setImgsrc} />}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            CreateRoom
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
