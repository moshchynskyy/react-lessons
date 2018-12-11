// Core
import React, {Component} from 'react';
import moment from 'moment';

// Components
import Catcher from './../../components/Catcher/';
import { withProfile } from "../HOC/withProfile";
import Composer from './../Composer';
import Post from './../Post';
import StatusBar from './../StatusBar';
import Spinner from './../Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from "./../../instruments";
import { api } from './../../config/api';


@withProfile
export default class Feed extends Component {
    state = {
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
        isPostFetching: false
    };

    componentDidMount() {
        this._fetchPosts();
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        console.log('->', posts);

        this.setState({
            posts,
            isPostFetching: false,
        });
    };

    _createPost = async (comment) => {
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
    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);
        const { posts } = this.state;

        await delay(1200);
        const updPosts = posts.filter(post => post.id !== id);
        this.setState(() => ({
            posts: updPosts,
            isPostFetching: false,
        }));
    };

    _likePost = async (id) => {
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

        console.log('this.state', this.state);

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key={post.id} >
                    <Post
                        {...post}
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            )
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