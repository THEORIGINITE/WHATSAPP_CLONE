import React, {useEffect,useState} from 'react';
import {storage} from '../firebase.js';


const useStorage = (imgsrc)=>{
  const [progress,setProgress]  = useState(0)
  const [url,setUrl] = useState(null);
  const [error,setError] = useState(null);

  useEffect(() => {
      const storageRef = storage.ref(imgsrc.name);
      storageRef.put(imgsrc).on('state_changed',(snap)=>{
          let percentage = (snap.bytesTransferred /snap.totalBytes)*100;
          setProgress(percentage);
      },(err)=>{
          setError(err);
      }, async ()=>{
       const url =  await storageRef.getDownloadURL();
        setUrl(url);
      })
  }, [imgsrc]);

  return{ progress , url , error }
}
export default useStorage;