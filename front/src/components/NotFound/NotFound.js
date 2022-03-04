import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn';
import './NotFound.jpg';



const NotFound = () => {
    return ( 
    <div className="NotFound">
        <h1>404</h1>
        <Link to="/"><button type="button" className> 
        <Btn text='Retourner à laccueil' />
        </button>
        </Link>
        <img src={NotFound} height="500" alt="NotFound"/>


    </div>
    )
    
}



export default React.memo(NotFound);

