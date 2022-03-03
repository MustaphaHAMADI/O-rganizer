import React from 'react';
import './header.scss';
import { NavLink } from "react-router-dom";
import './NotFound.scss';

const NotFound = () => {
    return ( 
    <div className="not-found">
        <h1>404</h1>
        <
        <NavLink to="/"> Retourner à l'accueil </NavLink>
        </div>;


export default React.memo(NotFound);
