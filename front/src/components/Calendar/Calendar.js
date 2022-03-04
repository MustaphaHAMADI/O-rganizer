import React from 'react';
import PropTypes from 'prop-types';
import './calendar.scss';
import Shift from '../Shift/Shift';

const Calendar = ({planningData}) => {
  return (
    <div className='calendar'>
    {planningData && planningData.map(({date,teams}) => <Shift key={date} date={date} teams={teams} />)}
    </div>
  )
};

Calendar.propTypes = {}

export default Calendar