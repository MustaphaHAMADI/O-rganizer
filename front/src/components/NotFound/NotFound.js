import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn';
import NotFoundImage from './NotFoundImage.jpg';



const NotFound = () => {
    return ( 
    <div className="NotFound">
        
        <Link to="/"><button type="button" className> 
        <Btn text='Retourner à laccueil' />
        </button>
        </Link>
        <img src={NotFoundImage} height="400" alt="NotFound"/>


    </div>
    )
    
}



export default React.memo(NotFound);

