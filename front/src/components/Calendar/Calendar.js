import React from 'react';
import './calendar.scss';
import Shift from '../Shift/Shift';

const Calendar = ({ planningData, handleModal }) => {
  return (
    <div className='calendar'>
      {planningData &&
        planningData.map(({ date, teams }) => (
          <Shift
            handleModal={handleModal}
            key={date}
            date={date}
            teams={teams}
          />
        ))}
    </div>
  );
};

Calendar.propTypes = {};

export default Calendar;
