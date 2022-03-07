import React, { useState } from 'react'
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './shift.scss';

const Shift = ({
    date,
    teams,
}) => {
    return (
        <div className='shift'>
            <div className='shift__date'>
                {format(new Date(date),'dd/MM/yyyy')}
            </div>
            {
            teams.map((team) => 
                <div className='shift__team' key={team.teamId}>
                    <div className={`shift__period shift__period${team.shift}`}>{team.shift} {team.status && <div className={`shift__event shift__event${team.shift}`}></div>}</div>
                </div>
            )}
        </div>
    )
}

Shift.propTypes = {
    date: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(
        PropTypes.shape({
            teamId: PropTypes.number.isRequired,
            team: PropTypes.string.isRequired,
            shift: PropTypes.string,
            status: PropTypes.arrayOf(
                PropTypes.shape({
                    statusId: PropTypes.number.isRequired,
                    firstName: PropTypes.string.isRequired,
                    lastName: PropTypes.string.isRequired,
                    status: PropTypes.string.isRequired,
                }).isRequired,
            )
        }).isRequired,
    ).isRequired,
}

Shift.defaultProps = {
    shift: '',
    status: null,
}

export default Shift