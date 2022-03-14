import React, { useEffect, useState } from 'react';
import Planning from '../../components/Planning/Planning';
import { loadPlanning } from '../../app/features/planningHandling/PlanningSlice';
import { useSelector, useDispatch } from 'react-redux';

const PlanningContainer = () => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    dispatch(loadPlanning());
    // eslint-disable-next-line
  }, [counter]);

  const handleReload = () => {
    setCounter(counter + 1);
  };

  const planning = useSelector((state) => state.planning.planning);
  const role = useSelector((state) => state.auth.user.role);
  return (
    <Planning handleReload={handleReload} planningData={planning} role={role} />
  );
};

export default PlanningContainer;
