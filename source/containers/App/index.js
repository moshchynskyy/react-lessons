// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import StatusBar from './../../components/StatusBar';
import Catcher from './../../components/Catcher/';
import { Provider } from './../../components/HOC/withProfile';
import Profile from "./../../components/Profile/index";
import Feed from "./../../components/Feed/index";


// Instruments
import avatar from './../../theme/assets/lisa.png';


const options = {
    avatar,
    currentUserFirstName: 'Антон',
    currentUserLastName: 'Мощинский',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options } >
                    <StatusBar/>
                    <Switch>
                        <Route component = { Profile } path = '/profile'  />
                        <Route component = { Feed } path = '/feed'  />
                        <Redirect to = '/feed'  />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
