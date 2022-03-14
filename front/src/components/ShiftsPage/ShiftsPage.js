import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './shiftsPage.scss';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { format } from "date-fns";
import { Select, MenuItem } from '@mui/material';
import planningService from '../../app/features/planningHandling/PlanningService';
import Btn from '../../components/Btn/Btn';
import { NavLink } from 'react-router-dom';

const ShiftsPage = ({
    teamData,
}) => {
    const [dayValue, setDayValue] = useState(new Date());
    const [selectedShift] = useState([]);
    const [planning, setPlanning] = useState([]);

    useEffect(() => {
        planningService.getPlanning().then((res) => setPlanning(res.data));
      }, []);

    const handleChange = (newValue) => {
      setDayValue(newValue);
    };

    const findDayShift = (currentTeam, day) => {
        console.log('fonction déclenchée');
        const searchedDay = planning.find((foundDay) => foundDay.date === format(new Date(day), 'yyyy-MM-dd'));
        console.log(selectedShift);
        if (searchedDay) {
            for (const team of searchedDay.teams) {
                if (team.team === currentTeam) {
                    switch (team.shift) {
                        case 'M':
                            return '1';
                        case 'AM':
                            return '2';
                        case 'N':
                            return '3';
                        default:
                            return '4';
                    }
                }
            }
        } else {
            return '4';
        }
    }

    return (
        <div className='shifts-page'>
            <div className='shifts-page__container'>

                <div className='shifts-page__calendar-container'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Date"
                          inputFormat="dd/MM/yyyy"
                          value={dayValue}
                          onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                </div>

                <form className='shifts-page__team-form'>
                    <div className='shifts-page__team-form-container'>
                        {teamData.map((team) => (
                            <div className='shifts-page__team-container' key={team.id}>
                                <div className='shifts-page__team-name'>{team.team}</div>
                                <Select
                                    sx={{ width: 200, borderRadius: '3rem' }}
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    defaultValue={findDayShift(team.team, dayValue)}
                                    value={selectedShift[team.id]}
                                    label={team.team}
                                >
                                    <MenuItem value='1'>M</MenuItem>
                                    <MenuItem value='2'>AM</MenuItem>
                                    <MenuItem value='3'>N</MenuItem>
                                    <MenuItem value='4'></MenuItem>
                                </Select>
                            </div>
                        ))} 
                    </div> 
                    <div className='shifts-page__btns'>
                        <Btn text='Vider la faction' />
                        <Btn text='Valider' />
                        <NavLink to='/planning'>
                            <Btn text='Retour'/>
                        </NavLink>
                    </div>              
                </form>
            </div>
        </div>
    )
}

ShiftsPage.propTypes = {}

export default ShiftsPage