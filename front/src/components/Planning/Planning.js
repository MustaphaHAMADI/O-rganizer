// import dependencies
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import function
import planningService from '../../app/features/planningHandling/PlanningService';
// components
import Team from '../Team/Team';
import Calendar from '../Calendar/Calendar';

import PlanningMobile from '../PlanningMobile/PlanningMobile';
import Modals from '../Modals/Modals';
// styles
import './planning.scss';

const Planning = ({ planningData }) => {
  const [membersData, setMembersData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setmodalInfo] = useState({ date: '', team: '' });

  const handleModal = (date, team) => {
    setIsOpen(true);
    setmodalInfo({ date, team });
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    planningService.getTeams().then((res) => setMembersData(res.data));
    planningService.getStatus().then((res) => setStatusData(res.data));
  }, []);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  return (
    <div className='planning'>
      <Desktop>
        <Modals
          planningData={planningData}
          statusData={statusData}
          membersData={membersData}
          handleClose={handleClose}
          date={modalInfo.date}
          team={modalInfo.team.team}
          open={isOpen}
        />
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
            <Calendar handleModal={handleModal} planningData={planningData} />
          </div>
        </div>
      </Desktop>

      <Mobile>
        <PlanningMobile planningData={planningData} teamData={membersData} />
      </Mobile>
    </div>
  );
};

export default Planning;
