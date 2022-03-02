import React from 'react'
import PropTypes from 'prop-types'

const TeamHeader = ({
    teamName,
    teamMembers,
}) => {
  return (
    <div className='teamheader'>
        <h3 className='teamheader__title'>{teamName}</h3>
        <ul className='teamheader__members'>
            {
            teamMembers.map((member) => (
                <li className='teamheader__member' key={member.id}>
                    {member.name} {member.lastname}
                </li>
            ))
            }
        </ul>
    </div>
  )
}

TeamHeader.propTypes = {
    teamName: PropTypes.string.isRequired,
    teamMembers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            lastname: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default TeamHeader
