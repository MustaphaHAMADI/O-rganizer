import React, { useEffect, useState } from 'react';
import planningService from '../../app/features/planningHandling/PlanningService';
import Team from '../Team/Team';
import './planning.scss';

const Planning = () => {
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    planningService.getEmployees().then((res) => setMembersData(res.data));
  }, []);

  return (
    <div className='planning'>
      <div className='planning__container'>
        <div className='planning__header'>
          {membersData.map((team) => 
            <Team 
              key={team.id} teamName={team.team} teamMembers={team.employees}
            />
        )}
        </div>
      </div>
    </div>
  );
};

export default Planning;
