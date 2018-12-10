// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { Consumer } from './../../components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';


export default class Composer  extends Component {
    state = {
        comment: '',
    };

    _updateComment = (e) => {
        this.setState({
            comment: e.target.value,
        });

    };

    _handleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    };

    _submitComment = () => {
        const { comment } = this.state;

        if(!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
           comment: '',
        });
    };

    _submitOnEnter = (e) => {
        const enterKey = e.key === 'Enter';

        if (enterKey) {
          e.preventDefault();
          this._submitComment();
        }
    };

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar }  />
                        <form
                            onSubmit = { this._handleFormSubmit }
                        >
                            <textarea
                                placeholder = { `What is on your mind, ${ context.currentUserFirstName}?` }
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress={ this._submitOnEnter }
                            />
                            <input type='submit' value='post' />
                        </form>
                    </section>
                )}
            </Consumer>

        );
    }
}

Composer.propTypes = {
    _createPost: PropTypes.func.isRequired
};
