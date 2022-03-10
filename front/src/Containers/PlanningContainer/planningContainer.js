import React, { useEffect, useState } from 'react';
import Planning from '../../components/Planning/Planning';
import { loadPlanning } from '../../app/features/planningHandling/PlanningSlice';
import { useSelector, useDispatch } from 'react-redux';

const PlanningContainer = () => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    dispatch(loadPlanning());
  }, [counter]);

  const handleReload = () => {
    setCounter(counter + 1);
  };

  const planning = useSelector((state) => state.planning.planning);
  const teams = useSelector((state) => state.planning.teams);
  const status = useSelector((state) => state.planning.status);
  return <Planning handleReload={handleReload} planningData={planning} />;
};

export default PlanningContainer;
