import React from 'react'
import './PageContact.scss';
import { Link } from "react-router-dom";
import Btn from '../Btn/Btn';
import team1 from '../../assets/team1.png';
import team2 from '../../assets/team2.png';
import team3 from '../../assets/team3.png';
import team4 from '../../assets/team4.png';
import team5 from '../../assets/team5.png';

const PageContact  = () => {
     
     
  return (  
        
    <div className="PageContact">
        
        <div className="photocontainer">
            <div className="content">
                <img className="photos" src={team1}  alt=""/>
                 <p className="prenom">Guillaume ROYER</p>
                 <p>  Project Manager / Scrum Master</p>
        </div>
      
       
            <div className="content">
                <img className="photos" src={team2}  alt=""/>
                <p className="prenom">Ludovic ROUGIER</p>
                <p> Lead Dev Back</p>
        </div>
        
        
            <div className="content">
                <img className="photos"  src={team3}  alt="" />
                 <p className="prenom"> Mustapha HAMADI</p>
                 <p> Lead Dev Front</p>
            </div>
        

            <div className="content">
                <img className="photos"  src={team4}  alt="" />
                <p className="prenom">Chloé THOMAS</p>
                <p> Référente technique REACT</p>
         </div>
        

            <div className="content">
                <img className="photos"  src={team5}  alt="" />
                <p className="prenom">Hassane TOURE</p> 
                <p>Référent technique GIT</p>
        </div>
        </div>
                         
        <div className="contactbutton">
        <Link to="/"> 
        <Btn text='Retourner à l accueil'/>
        </Link>
        </div>  
        
  </div>

   
   
    
  )


  
        }
export default PageContact;
