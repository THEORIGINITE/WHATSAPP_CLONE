import React ,{useEffect}from 'react';
import useStorage from './useStorage';
import './Progressbar.css';
 const Progressbar = ({imgsrc,setImgsrc}) => {

    const {url , progress} =useStorage(imgsrc);
    console.log(progress,url);
    return (
        <div className="progress">
          <div className="progress-bar " style={{width:progress+'%'}}></div>
        </div>
    )
}

export default Progressbar;
