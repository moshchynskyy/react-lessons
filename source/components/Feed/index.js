// Core
import React, {Component} from 'react';
import moment from 'moment';

// Components
import Composer from './../Composer';
import Post from './../Post';
import StatusBar from './../StatusBar';
import Spinner from './../Spinner';

// Instruments
import Styles from './styles.m.css';
import {getUniqueID, delay} from "../../instruments";


export default class Feed extends Component {
    constructor() {
        super();

        this.state = {
            posts: [
                {
                    id: getUniqueID(),
                    comment: 'it is my comment 1',
                    created: 1526825076899,
                    likes: [],
                },
                {
                    id: getUniqueID(),
                    comment: 'it is my comment 2',
                    created: 1526825076819,
                    likes: [],
                }
            ],
            isSpinning: false,
            isPostFetching: false
        };

        this._createPost = this._createPost.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    };

    async _createPost(comment) {
        this._setPostsFetchingState(true);

        const post = {
            id: getUniqueID(),
            created: moment().utc(),
            comment,
            likes: [],
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts: [post, ...posts],
            isPostFetching: false,
        }));
    }

    async _removePost(id) { // TODO fix it
        this._setPostsFetchingState(true);
        const { posts } = this.state;

        await delay(1200);
        const updPosts = posts.filter(post => post.id !== id);
        this.setState(() => ({
            posts: updPosts,
            isPostFetching: false,
        }));
    }

    async _likePost(id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName,
                        }
                    ]
                }
            }

            return post;
        });

        this.setState({
            posts: newPosts,
            isPostFetching: false,
        })
    };

    render() {
        const {posts, isPostFetching} = this.state;
        const postsJSX = posts.map((post) => {
            return <Post key={post.id} {...post} _likePost = { this._likePost } _removePost = { this._removePost } />;
        });

        return (
            <section className={Styles.feed}>
                <Spinner isPostFetching={isPostFetching}/>
                <StatusBar/>
                <Composer _createPost={this._createPost}/>
                {postsJSX}
            </section>
        );
    }
}
