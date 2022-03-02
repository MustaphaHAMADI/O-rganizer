import React, { useEffect, useState } from 'react';
import planningService from '../../app/features/planningHandling/PlanningService';

const Planning = () => {
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    planningService.getEmployees().then((res) => setMembersData(res.data));
  }, []);

  return (
    <div className='planning'>
      Planning
    </div>
  );
};

export default Planning;
