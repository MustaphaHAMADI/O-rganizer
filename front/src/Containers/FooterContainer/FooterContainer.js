import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// components
import Footer from '../../components/Footer/Footer';

const FooterContainer = props => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return (
        <Footer isLoggedIn={isLoggedIn}/>
    )
}

FooterContainer.propTypes = {}

export default FooterContainer