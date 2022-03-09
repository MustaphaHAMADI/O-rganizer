import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Modal, Select, MenuItem, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
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
  const { handleSubmit, register, reset } = useForm();
  const [defaultStatus, setDefaultStatus] = useState({});
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

  const handleModalClose = () => {
    reset(
      {},
      {
        keepValues: false,
      }
    );
    handleClose();
  };

  const handleSubmitForm = (data) => {
    console.log(data);
    console.log(defaultValues);

    for (let key in data) {
      if (defaultValues[key]) {
        if (
          defaultValues[key].id !== Number(data[key]) &&
          Number(data[key]) !== 11
        ) {
          defaultValues[key].id = data[key];
          console.log('route patch pour employye id ' + key);
          console.log('la valeur a change il faut patch ');
        }

        if (Number(data[key]) === 11) {
          delete defaultValues[key];
          console.log('delete');
        }
      } else {
        if (Number(data[key]) !== 11) {
          if (!key.includes('comment')) {
            let commentKey = `comment-${key}`;
            if (!defaultValues[key]) {
              defaultValues[key] = {};
            }
            defaultValues[key].id = data[key];
            console.log('appel api POST');
            console.log('id', data[key]);
            console.log('comment', data[commentKey]);
          }
        }
      }
    }
  };
  const defaultValues = {};

  const findStatusId = (arr, person) => {
    let foundAffectedStatus;
    if (arr) {
      foundAffectedStatus = arr.find((el) => el.lastName === person.lastName);
    }
    if (foundAffectedStatus) {
      const foundStatus = statusData.find(
        (el) => el.label === foundAffectedStatus.status
      );

      if (foundStatus) {
        defaultValues[person.id] = foundStatus;
        return foundStatus.id;
      }
    }

    return '11';
  };
  const findComment = (arr, person) => {
    let foundAffectedStatus;
    if (arr) {
      foundAffectedStatus = arr.find((el) => el.lastName === person.lastName);
    }

    if (foundAffectedStatus) {
      return foundAffectedStatus.comment;
    }

    return '';
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {date ? (
        <div className='modal__container'>
          <h1 className='modal__team--title'>{team}</h1>
          <p className='modal___team--date'>
            {format(new Date(date), 'dd/MM/yyyy')}
          </p>

          {members[0].employees &&
            members[0].employees.map((e) => (
              <form
                key={e.id}
                className='modal__form'
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <div className='modal__member--container'>
                  <p className='modal__team--member'>{e.firstName}</p>
                  <Select
                    {...register(`${e.id}`)}
                    className='modal__select'
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    defaultValue={findStatusId(dayStatus, e)}
                    value={selectedItems[e.id]}
                    label='status'
                  >
                    <MenuItem value='11'>Aucun status</MenuItem>
                    {statusData &&
                      statusData.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                          {e.label}
                        </MenuItem>
                      ))}
                  </Select>
                  <TextField
                    {...register(`comment-${e.id}`)}
                    className='modal__input'
                    id='outlined-basic'
                    label='Commentaire'
                    variant='outlined'
                    defaultValue={findComment(dayStatus, e)}
                  />
                </div>
              </form>
            ))}
          <Button onClick={handleSubmit(handleSubmitForm)} type='submit'>
            Valider
          </Button>
        </div>
      ) : (
        <h1 className='team__title'>modal</h1>
      )}
    </Modal>
  );
};
export default Modals;
