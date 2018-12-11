// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import { withProfile } from "../HOC/withProfile";
import Like from './../../components/Like';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    };

    render() {
        const { comment, created, _likePost, id, likes, avatar, firstName, lastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span onClick = { this._removePost } className = { Styles.cross } />
                <img src = { avatar } />
                <a>{ `${firstName} ${lastName}` }</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}

Post.propTypes = {
    _likePost: PropTypes.func.isRequired,
    comment: PropTypes.string.isRequired,
    created: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    likes: PropTypes.array.isRequired,
};
