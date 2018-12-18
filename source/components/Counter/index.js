// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.m.css';

const Counter = ({ count }) => (
    <section className = { Styles.counter } >Posts: { count }</section>
);

Counter.propTypes = {
    count: PropTypes.number.isRequired,
};

Counter.defaultProps = {
    count: 0,
};

export default Counter;