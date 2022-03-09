import React, { useEffect } from 'react';
import Planning from '../../components/Planning/Planning';
import { loadPlanning } from '../../app/features/planningHandling/PlanningSlice';
import { useSelector, useDispatch } from 'react-redux';

const PlanningContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlanning());
  }, [dispatch]);
  const planning = useSelector((state) => state.planning.planning);
  const teams = useSelector((state) => state.planning.teams);
  const status = useSelector((state) => state.planning.status);
  return <Planning planningData={planning} />;
};

export default PlanningContainer;
