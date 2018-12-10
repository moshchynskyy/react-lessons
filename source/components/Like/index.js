// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';


export default class Like extends Component {
    state = {
        showLikers: false,
    };

    _showLikers = () => {
        this.setState({
            showLikers: true
        });
    };

    _hideLikers = () => {
        this.setState({
            showLikers: false
        });
    };

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) =>
            <li key = { id }>
                { `${ firstName } ${lastName}` }
            </li>
        );

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    };

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;
        const likersList = this._getLikersList();

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            )
        });
    };

    _likePost = () => {
        const { _likePost, id } = this.props;

        _likePost(id);
    };

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        })
    };

    _getLikesDescription = () => {
        const { likes, currentUserLastName, currentUserFirstName } = this.props;
        const likedByMe = this._getLikedByMe();

        if ( likes.length === 1 && likedByMe ) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if ( likes.length === 2 && likedByMe ) {
            return `you and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `you and ${likes.length - 1} others`;
        }

        return likes.length;
    };

    render() {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like } >
                <span className = { likeStyles  } onClick = { this._likePost } >
                    like
                </span>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers } >
                        { likesDescription }
                    </span>
                </div>
            </section>
        );
    }
}

Like.propTypes = {
    _likePost: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    likes: PropTypes.any.isRequired,
};
