// Core
import React, {Component} from 'react';

// Components
import { withProfile } from "../HOC/withProfile";

// Instruments
import Styles from './styles.m.css';


@withProfile
export default class Profile extends Component {
    render() {
        const { currentUserFirstName, currentUserLastName, avatar  } = this.props;

        return (
            <section className =  { Styles.profile }>
                 <h1>Welcome, { currentUserFirstName }</h1>
                <img src = { avatar } />
            </section>
        );
    }
}