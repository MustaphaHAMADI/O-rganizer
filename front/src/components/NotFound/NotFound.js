import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn';
import NotFoundImage from './NotFoundImage.png';



const NotFound = () => {
    return ( 
        <div className="not-found"  

        

  style={{ backgroundImage: `url(${NotFoundImage/NotFoundImage.png})`,

        height: "700px", width: "700", alt:"not-found",
        backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'


  }}>
        
        <Link to="/"> 
        <Btn text="Retourner à l' accueil"/>
        </Link>
    
       
    </div>
    )
    
  
}



export default React.memo(NotFound);

/*<img src={NotFoundImage} height="500" width="500" alt="not-found"/>*/
        