import React from 'react'
import PropTypes from 'prop-types'

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
                    {member.name} {member.lastname}
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
            name: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default Team
