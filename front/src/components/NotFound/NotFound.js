import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn'




const NotFound = () => {
    return ( 
    <div className="not-found">
        <h1>404</h1>
        <Link to="/"><button type="button" className> 
        
        <Btn text='Retourner à laccueil' />
        </button>
        </Link>
    


    </div>
    )
    
}



export default React.memo(NotFound);

