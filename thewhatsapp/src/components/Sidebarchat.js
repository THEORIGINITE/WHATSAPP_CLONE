import React ,{useEffect,useState}from 'react';
import {Avatar,Fab} from '@material-ui/core';
import './Sidebarchat.css';
import db from '../firebase';
import {Link}from 'react-router-dom';
import FormDialog from './Dialog';

function Sidebarchat({id,name,addNewChat,img}) {

   const [seed , setSeed]=useState('');
   const [messages,setMessages]= useState("");

   useEffect(()=>{
    if(id){
        db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot=>(
         setMessages(snapshot.docs.map((doc)=>
         doc.data()))
        ));
    }
   },[id])

   useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
   }, [])
   const createChat= ()=>{
       const roomName= prompt("please enter name for chat");
       if (roomName){
           db.collection("rooms").add({
           name:roomName,
        })
       }
   }

    return !addNewChat? (
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
           <Avatar src={img} /> 
           <div className="sidebarChat_info">
               <h3>{name}</h3>
               <p>{messages[0]?.message}</p>
           </div>
        </div>
      </Link>   
    ):(
        <div  className="add_room" >
           <FormDialog/>
        </div>
    )
}

export default Sidebarchat;
