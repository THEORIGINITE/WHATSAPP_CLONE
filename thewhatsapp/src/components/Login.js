import React from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import {auth,provider} from '../firebase'
import { useStateValue } from '../StateProvider';
import {actionTypes} from '../reducer';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

function Login() {
    const [{},dispatch]= useStateValue();
    const signIn=()=>{
      auth.signInWithPopup(provider).then((result) =>{
        dispatch({
          type:actionTypes.SET_USER,
          user:result.user,
        });
      }).catch((error)=>alert(error.message));
    };
    return (
        <div className="login">
          <div  className="login_container" >
            <h1> by theoriginite-bittu</h1>
            <img src="https://img.icons8.com/doodle/100/000000/whatsapp.png"/>
            <Button onClick={signIn}  variant="contained" >
               LOGIN 
            </Button>
          </div>   
       
        </div>
    )
}

export default Login;
