import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.scss';
import Btn from '../Btn/Btn';
import Img from '../../assets/404.png';

const NotFound = () => {
    return ( 
        <div className="not-found" > 
            <Link to="/"> 
                <div className='not-found__container'>
                    <div className='not-found__title'>Oooops... !</div>
                    <div className='not-found__subtitle'>La page que vous recherchez semble introuvable</div>
                    <img className='not-found__img' src={Img} alt='404 not found' />
                    <Btn text='Retourner à l accueil' />
                </div>
            </Link>   
        </div>
    )  
}

export default React.memo(NotFound);
        