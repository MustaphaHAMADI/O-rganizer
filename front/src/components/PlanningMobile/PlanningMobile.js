import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './planningMobile.scss';
import planningService from '../../app/features/planningHandling/PlanningService';
import { format } from 'date-fns';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PlanningMobile = props => {
    const [planningData, setPlanningData] = useState([]); 
    const [teamData, setTeamData] = useState([]); 
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        planningService.getPlanning().then((res) => setPlanningData(res.data));
        planningService.getTeams().then((res) => setTeamData(res.data));
    }, []);

    const [expanded, setExpanded] = React.useState(false);  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className='planning-mobile'>
        {
            planningData.filter(day => day.date === date).map((day) => (
                <div className='planning-mobile__container'>
                    {
                        day.teams.map((team) => (
                            <div className='planning-mobile__team'>
                                <div className='planning-mobile__team-details'>
                                    <p className='planning-mobile__team-name'>{team.team}</p>
                                    <div>

                                        <Accordion 
                                            expanded={expanded === `panel${team.teamId}`}
                                            onChange={handleChange(`panel${team.teamId}`)} 
                                            elevation={0}
                                            disableGutters
                                            sx={{
                                                backgroundColor:'transparent',
                                            }}>
                                            <AccordionSummary
                                              aria-controls={`panel${team.teamId}bh-content`}
                                              id={`panel${team.teamId}bh-header`}
                                              expandIcon={<ExpandMoreIcon />}

                                              sx={{
                                                  display: 'inline-block',
                                                  marginTop: '-2rem',
                                              }}
                                            >
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography 
                                                    noWrap={true}
                                                    component={'div'}
                                                >
                                                    
                                                    {
                                                        teamData.find(foundTeam => foundTeam.id === team.teamId).employees.map((employee) => 
                                                            <p className='team__member' >
                                                                {employee.firstName} {employee.lastName}
                                                            </p>
                                                        )
                                                    }

                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                    </div>
                                    <div className='planning-mobile__team-event'></div>
                                </div>
                                <div className='planning-mobile__team-shift'>
                                    {team.shift}
                                </div>
                            </div>
                        ))
                    }               
                    <div className='planning-mobile__date'>
                        <div className='planning-mobile__previous-date'>
                            <i className='planning-mobile__icon'>IMG</i>
                            <div className='planning-mobile__date-text'>08/01/2022</div>
                        </div>
                        <div className='planning-mobile__current-date'>
                            <i className='planning-mobile__icon'>IMG</i>
                            <div className='planning-mobile__date-text'>{format(new Date(day.date),'dd/MM/yyyy')}</div>
                        </div>
                        <div className='planning-mobile__next-date'>
                            <i className='planning-mobile__icon'>IMG</i>
                            <div className='planning-mobile__date-text'>08/01/2022</div>
                        </div>
                    </div>                    
                </div>
            ))
        }
    </div>
  )
}

PlanningMobile.propTypes = {}

export default React.memo(PlanningMobile);