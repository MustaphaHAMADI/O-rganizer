import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn';




const NotFound = () => {
    return ( 
        <div className="not-found" > 

        <Link to="/"> 
        <Btn text="Retourner à l' accueil"/>
        </Link>
    
       
    </div>
    )
    
  
}



export default React.memo(NotFound);

/*<img src={NotFoundImage} height="500" width="500" alt="not-found"/>*/
        