// import dependencies
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import function
import planningService from '../../app/features/planningHandling/PlanningService';
// components
import Team from '../Team/Team';
import Calendar from '../Calendar/Calendar';
import PlanningMobile from '../PlanningMobile/PlanningMobile';
// styles
import './planning.scss';

const Planning = ({ planningData }) => {
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    planningService.getTeams().then((res) => setMembersData(res.data));

  }, []);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return isDesktop ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

  return (
    <div className='planning'>

      <Desktop>
        <div className='planning__container'>
          <div className='planning__header'>
            {membersData.map((team) => (
              <Team
                key={team.id}
                teamName={team.team}
                teamMembers={team.employees}
              />
            ))}
          </div>

          <div className='planning__calendar'>
            <Calendar planningData={planningData} />
          </div>
        </div>
      </Desktop>

      <Mobile>
        <PlanningMobile planningData={planningData} teamData={membersData}/>
      </Mobile>

    </div>
  );
};

export default Planning;
