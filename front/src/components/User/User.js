import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './user.scss';
import avatar from '../../assets/user.png';
import planningService from '../../app/features/planningHandling/PlanningService';


const User = props => {
    const [user, setUser] = useState([]);
    const userId = JSON.parse(localStorage.user).id;

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('test')
    }

    useEffect(() => {
        planningService.getUser(userId).then((res) => setUser(res.data));
      }, [userId]);

    return (
        <div className='user'>
            <div className='user__container'>
                <img className='user__avatar' src={avatar} alt='Avatar'/>
                <form className='user__form' onSubmit={onSubmit}>
                    <div className='user__details'>
                        <div className='user__regnumber'>
                            <p>Matricule</p>
                            <p>{user.reg_number}</p>
                        </div>
                        <div className='user__name'>
                            <p>Prénom</p>
                            <p>{user.name}</p>
                        </div>
                        <div className='user__lastname'>
                            <p>NOM</p>
                            <p>{user.lastname}</p>
                        </div>
                        <div className='user__password'>
                            <p>Mot de passe</p>
                            <input name='password' type='text' placeholder='Modifier votre mot de passe'></input>
                        </div>
                        <div className='user__function'>
                            <p>Fonction</p>
                            <p>{user.function}</p>
                        </div>
                        <div className='user__team'>
                            <p>Equipe</p>
                            <p>{user.team}</p>
                        </div>
                    </div>
                    <button type='submit'>Valider</button>
                </form>
            </div>
        </div>
    )
}

User.propTypes = {}

export default User