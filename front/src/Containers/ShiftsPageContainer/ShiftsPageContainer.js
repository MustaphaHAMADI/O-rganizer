import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ShiftsPage from '../../components/ShiftsPage/ShiftsPage'
import { useSelector } from 'react-redux';
import planningService from '../../app/features/planningHandling/PlanningService';

const ShiftsPageContainer = props => {
    //const planning = useSelector((state) => state.planning.planning);
    const [membersData, setMembersData] = useState([]);

    useEffect(() => {
        planningService.getTeams().then((res) => setMembersData(res.data));
      }, []);

    return (
        <ShiftsPage teamData={membersData} />
    )
}

ShiftsPageContainer.propTypes = {}

export default ShiftsPageContainer