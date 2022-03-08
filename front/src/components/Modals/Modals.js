import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Select, MenuItem, TextField } from '@mui/material';
import Btn from '../Btn/Btn';
import './modals.scss';

const Modals = ({
  open,
  handleClose,
  team,
  date,
  membersData,
  statusData,
  planningData,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  let dayTeam = null;
  let dayStatus = null;
  const members = membersData.filter((e) => e.team === team);
  const dayData = planningData.find((e) => e.date === date);
  if (dayData) {
    dayTeam = dayData.teams.find((e) => e.team === team);
    if (dayTeam.status) {
      dayStatus = dayTeam.status;
    }
  }

  const onChangeSelect = (event, item) => {
    setSelectedItems(
      selectedItems.concat({ [selectedItems[item.id]]: event.target.value })
    );
  };

  const findStatus = (arr, person) => {
    const foundAffectedStatus = arr.find(
      (el) => el.lastName === person.lastName
    );
    if (foundAffectedStatus) {
      console.log(foundAffectedStatus);
      const foundStatus = statusData.find(
        (el) => el.label === foundAffectedStatus.status
      );

      if (foundStatus) {
        return foundStatus.id;
      }
    }

    return '';
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {date ? (
        <span>
          <form className='modal__form'>
            {members[0].employees &&
              members[0].employees.map((e) => (
                <div key={e.id}>
                  <p className='modal__team--title'>{e.firstName}</p>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    defaultValue={findStatus(dayStatus, e)}
                    value={selectedItems[e.id]}
                    label='status'
                    onChange={(el) => onChangeSelect(el, e)}
                  >
                    {statusData &&
                      statusData.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          {e.label}
                        </MenuItem>
                      ))}
                  </Select>
                  <TextField
                    id='outlined-basic'
                    label='Commentaire'
                    variant='outlined'
                    defaultValue=''
                  />
                </div>
              ))}
          </form>
          <h1 className='modal__team--title'>{team}</h1>
          <p className='modal___team--date'>{date}</p>
        </span>
      ) : (
        <h1 className='team__title'>modal</h1>
      )}
    </Modal>
  );
};

export default Modals;
