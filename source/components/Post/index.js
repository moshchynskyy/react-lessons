// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import { Consumer } from './../../components/HOC/withProfile';
import Like from './../../components/Like';

// Instruments
import Styles from './styles.m.css';


export default class Post extends Component {

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    };

    render() {
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span onClick = { this._removePost } className = { Styles.cross } />
                        <img src = { context.avatar } />
                        <a>{ context.currentUserFirstName } { context.currentUserLastName }</a>
                        <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                        <p>{ comment }</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
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
