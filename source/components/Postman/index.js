// Core
import React from 'react';

// Animations
import {fromTo} from 'gsap';
import {Transition} from 'react-transition-group';

// Instruments
import {withProfile} from "../HOC/withProfile";
import Styles from './styles.m.css';

const Postman = (props) => {

    const _animatePostmanOnEnter = (block) => {
        fromTo(
            block,
            1,
            { opacity: 0, x: 400 },
            { opacity: 1, x: 0 },
        )
    };

    const _animatePostmanEntering = (block) => {
        fromTo(
            block,
            1,
            { opacity: 1 },
            { opacity: 0 },
        )
    };

    return (
        <Transition
            in
            appear
            timeout = { {
                enter: 3000,
                exit: 1000
            } }
            onEnter = { _animatePostmanOnEnter }
            onEntered = { _animatePostmanEntering }
        >
            <section className={Styles.postman}>
                <img src={props.avatar}/>
                <span>Welcome online, {props.currentUserFirstName} </span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
