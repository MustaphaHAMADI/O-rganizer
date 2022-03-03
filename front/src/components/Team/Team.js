import React from 'react';
import PropTypes from 'prop-types';
import './team.scss';

const Team = ({
    teamName,
    teamMembers,
}) => {
  return (
    <div className='team'>
        <h3 className='team__title'>{teamName}</h3>
        <ul className='team__members'>
            {
            teamMembers.map((member) => (
                <li className='team__member' key={member.id}>
                    {member.firstName} {member.lastName}
                </li>
            ))
            }
        </ul>
    </div>
  )
}

Team.propTypes = {
    teamName: PropTypes.string.isRequired,
    teamMembers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default Team
