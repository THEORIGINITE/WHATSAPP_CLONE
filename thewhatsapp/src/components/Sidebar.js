import React ,{useEffect,useState}from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './sidecss.css';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlineIcon from '@material-ui/icons/SearchOutlined';
import Sidebarchat from './Sidebarchat';
import db from '../firebase';
import {Link}from 'react-router-dom';
import { useStateValue } from '../StateProvider';



 function Sidebar(){
    
    const [rooms,setRooms]=useState([]);
    const [{user}, dispatch]= useStateValue();
    useEffect(()=>{
      db.collection("rooms").onSnapshot((snapshot)=>
      setRooms(snapshot.docs.map((doc) =>({
          id: doc.id,
          data: doc.data(),
        }))
       )
      );
    },[]);

    
    return (
        <div className="sidebar">
          <div className="sidebar_header">
            <Avatar className="sidebar_profile" title={user?.displayName} src={user?.photoURL}/>
            <div className="sidebar_headerRight">
              <IconButton>
               <DonutLargeIcon/>
              </IconButton>
              <IconButton>
               <ChatIcon/>
              </IconButton>
              <IconButton>
               <MoreVertIcon/>
              </IconButton>
            </div>
          </div>
          <div className="sidebar_search">
            <div className="sidebar_searchContainer">
              <SearchOutlineIcon/>
              <input type="text" placeholder="search or start a new chat"/>
            </div>  
          </div>
          <div className="sidebar_chats">
            <Sidebarchat addNewChat />  
            {rooms.map(room=>(
              <Sidebarchat key={room.id} id={room.id} name={room.data.name} img={room.data.img}/>
            ))}
          </div>
        </div>
    )
}
export default Sidebar;