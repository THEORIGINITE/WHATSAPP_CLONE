import React ,{useEffect,useState}from 'react';
import {Avatar, IconButton,Fab} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlineIcon from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import {useParams} from 'react-router-dom';
import firebase from 'firebase';
import db from '../firebase';
import {useStateValue} from '../StateProvider';
function Chat() {
    const [input , setInput]=useState('');
    const [seed , setSeed]=useState('');
    const [space, setSpace]= useState('');
    const [messages,setMessages]= useState([]);
    const [{user},dispatch]=useStateValue();
    const { roomId } = useParams();
   
    
    useEffect(() => {
      if(roomId){
        db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>
          setSpace(snapshot.data().name));

          db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc => doc.data()
              ))
          ))
      }
    }, [roomId]);
    
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [roomId]);

    const SendMessage=(e)=>{
      e.preventDefault();
      db.collection("rooms").doc(roomId).collection("messages").add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
    return (
        <div className="chat">
            <div className="chat_header">
               <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            
               <div className="chat_headerInfo">
                   <h3>{space}</h3>
                   <p>Last seen {""}
                      {new Date(
                      messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                   </p>
               </div>
               <div className="chat_headerRight">
                  <IconButton>
                    <SearchOutlineIcon/>
                  </IconButton>
                  <IconButton>
                    <AttachFile/>
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon/>
                  </IconButton>
               </div>
            </div>   
            <div className="chat_body">
                {messages.map(message=>(
                  <p className={`chat_message ${message.name==user.displayName && "chat_reciever"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                       {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                  </p>
                ))}
                
            </div>
            <div className="chat_footer"> 
               <InsertEmoticonIcon/>
               <form>
                  <input type="text" value={input} onChange={e=>
                setInput(e.target.value)} placeholder="Type your message"/>
                  <button type="submit" onClick={SendMessage}><Fab size="small"><SendIcon/></Fab></button>
               </form>
               <MicIcon/> 
            </div>
        </div>
    )
}

export default Chat
