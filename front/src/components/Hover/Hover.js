import React from 'react';
import PropTypes from 'prop-types';
import './hover.scss';

const Hover = ({
    status,
}) => {
  return (
    <div className='hover'>
        <div className='hover__container'>
            {
                status.map((element) => 
                <div className='hover__status' key={element.statusId}>
                    <p className='hover__status-content'>{element.firstName} {element.lastName}</p>
                    <span>{element.status}</span>
                </div>)
            }
        </div>
    </div>
  )
}

Hover.propTypes = {
    status: PropTypes.arrayOf(
        PropTypes.shape({
            statusId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default Hover