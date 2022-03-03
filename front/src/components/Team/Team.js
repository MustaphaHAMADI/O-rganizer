import React from 'react';
import PropTypes from 'prop-types';
import './team.scss';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Team = ({
    teamName,
    teamMembers,
}) => {
    const [expanded, setExpanded] = React.useState(false);  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className='team'>
            <h3 className='team__title'>{teamName}</h3>
            <ul className='team__members--desktop'>
                {teamMembers.map((member) => (
                    <li className='team__member' key={member.id}>
                        {member.firstName} {member.lastName}
                    </li>
                ))}
            </ul>

            <div className='team__members--mobile'>
                <Accordion 
                    expanded={expanded === 'panel'}
                    onChange={handleChange('panel')} 
                    elevation={0} 
                    sx={{backgroundColor:'transparent'}}>
                    <AccordionSummary
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {teamMembers.map((member) => (
                            <li className='team__member' key={member.id}>
                                {member.firstName} {member.lastName}
                            </li>
                        ))}
                      </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

Team.propTypes = {
    teamName: PropTypes.string.isRequired,
    teamMembers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default Team
