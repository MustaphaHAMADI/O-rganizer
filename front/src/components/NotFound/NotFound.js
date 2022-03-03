import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';

const NotFound = () => {
    return ( 
    <div className="not-found">
        <h1>404</h1>
        
        <Link to="/"> Retourner à l'accueil </Link>

    </div>
    )
    
}



export default React.memo(NotFound);
