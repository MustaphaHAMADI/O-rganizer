// import dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format, addDays } from 'date-fns';

// import styles
import './planningMobile.scss';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import icons
import currentDay from '../../assets/current.png';
import nextDay from '../../assets/next.png';
import previousDay from '../../assets/previous.png';

const PlanningMobile = ({
    planningData,
    teamData,
}) => {
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const [expanded, setExpanded] = React.useState(false);  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handlePreviousDay = () => {
        setDate(format(addDays(new Date(date), -1), 'yyyy-MM-dd'));
    }

    const handleNextDay = () => {
        setDate(format(addDays(new Date(date), +1), 'yyyy-MM-dd'));
    }

  return (
    <div className='planning-mobile'>
        {
            planningData && planningData.filter(day => day.date === date).map((day) => (
                <div className='planning-mobile__container' key={day.date}>
                    {
                        day.teams.map((team) => (
                            <div className='planning-mobile__team' key={team.teamId}>
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
                                                  width: '30%',
                                                  marginTop: '-1.8rem',
                                              }}
                                            >
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography 
                                                    noWrap={false}
                                                    component={'div'}
                                                >
                                                    
                                                    {
                                                        teamData.length > 1 ? teamData.find(foundTeam => foundTeam.id === team.teamId).employees.map((employee) => 
                                                            <p className='planning-mobile__accordion planning-mobile__accordion--members' key={employee.id}>
                                                                {employee.firstName} {employee.lastName}
                                                            </p>
                                                        )
                                                        : null
                                                    }
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                    </div>

                                    {team.status && 
                                        <div className='planning-mobile__status-warning'>
                                            <div className='planning-mobile__event'></div>
                                            <Accordion 
                                                expanded={expanded === `panel2${team.teamId}`}
                                                onChange={handleChange(`panel2${team.teamId}`)} 
                                                elevation={0}
                                                disableGutters
                                                sx={{
                                                    backgroundColor:'transparent',
                                                    '&:before': {
                                                        display: 'none',
                                                    },
                                                }}>
                                                <AccordionSummary
                                                  aria-controls={`panel${team.teamId}bh-content`}
                                                  id={`panel${team.teamId}bh-header`}
                                                  expandIcon={<ExpandMoreIcon />}
                                                  sx={{
                                                      display: 'inline-block',
                                                      width: '30%',
                                                      marginTop: '-3.5rem',
                                                      marginLeft: '0.9rem',
                                                  }}
                                                >
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography 
                                                        noWrap={false}
                                                        component={'div'}
                                                    >

                                                        {
                                                            team.status.map((event) => (
                                                                <p className='planning-mobile__accordion planning-mobile__accordion--status' key={event.statusId}>{event.firstName} {event.lastName} <span className='planning-mobile__accordion--status-strong'>{event.status} {event.replacementTeam}</span></p>
                                                                
                                                            ))
                                                        }
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    }

                                </div>
                                <div className='planning-mobile__team-shift'>
                                    {team.shift}
                                </div>
                            </div>
                        ))
                    }               
                    <div className='planning-mobile__date'>
                        <div className='planning-mobile__previous-date' onClick={handlePreviousDay}>
                            <img src={previousDay} className='planning-mobile__icon' alt='Journée précédente'/>
                            <div className='planning-mobile__date-text'>{format(addDays(new Date(day.date), -1), 'dd/MM/yyyy')}</div>
                        </div>
                        <div className='planning-mobile__current-date'>
                            <img src={currentDay} className='planning-mobile__icon' alt='Journée actuelle'/>
                            <div className='planning-mobile__date-text'>{format(new Date(day.date),'dd/MM/yyyy')}</div>
                        </div>
                        <div className='planning-mobile__next-date' onClick={handleNextDay}>
                            <img src={nextDay} className='planning-mobile__icon' alt='Journée suivante'/>
                            <div className='planning-mobile__date-text'>{format(addDays(new Date(day.date), 1), 'dd/MM/yyyy')}</div>
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