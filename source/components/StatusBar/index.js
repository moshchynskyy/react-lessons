// Core
import React, { Component } from 'react';
import cx from 'classnames';
import { fromTo } from 'gsap';
import { Transition } from 'react-transition-group';

// Components
import { withProfile } from "../HOC/withProfile";

// Instruments
import Styles from './styles.m.css';
import { socket } from './../../socket/init';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount() {
       socket.on('connect', () => {
           this.setState({
               online: true,
           });
       });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    };

    _animateOnStatusBarEnter = (bar) => {
        fromTo(
            bar,
            1,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0 },
        )
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyles = cx(Styles.status, {
            [Styles.online]: online,
            [Styles.offline]: !online
        });

        const statusMessage = online ? 'online' : 'offline';

        console.log('online', online);

        return (
            <Transition
                in
                appear
                timeout = { 1000 }
                onEnter = { this._animateOnStatusBarEnter }
            >
                <section className = { Styles.statusBar }>
                    <div className = {statusStyles } >
                        <div>{ statusMessage }</div>
                        <span />
                    </div>
                    <button>
                        <img src={ avatar } />
                        <span>{ currentUserFirstName }</span>
                        &nbsp;
                        <span>{ currentUserLastName }</span>
                    </button>
                </section>
            </Transition>
        )
    }
}
