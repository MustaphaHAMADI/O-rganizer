import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn';
import NotFoundImage from './NotFoundImage.jpg';



const NotFound = () => {
    return ( 
    <div className="not-found">
 
 <img src={NotFoundImage} height="500" width="500" alt="not-found"/>
        
        <Link to="/"> 
        <Btn text='Retourner à laccueil'/>
        </Link>
    
       
    </div>
    )
    
  
}



export default React.memo(NotFound);

