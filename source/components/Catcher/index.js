// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import Styles from './styles.m.css';


export default class Catcher extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, stack) {
        console.log('ERROR: ', error);
        console.log('STACKTRACE: ', stack.componentStack);

        this.setState({
            error: true,
        });
    }

    render() {

        if (this.state.error) {
            return (
                <section className = { Styles.catcher } >
                    <span>A mysterious error occured </span>
                    <p>Our space eng-s fixing</p>
                </section>
            )
        }

        return this.props.children;
    }
};

Catcher.propTypes = {
    children: PropTypes.object.isRequired,
};
