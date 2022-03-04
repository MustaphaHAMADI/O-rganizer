import React from 'react'
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
        teams.map((team) => <div className='shift__team' key={team.teamId}>{team.shift}</div>)
        }
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
        }).isRequired,
    ).isRequired
}

Shift.defaultProps = {
    shift: ''
}

export default Shift