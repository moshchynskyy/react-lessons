// Core
import React, {Component} from 'react';
import { fromTo } from 'gsap'
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import Catcher from './../../components/Catcher/';
import { withProfile } from "../HOC/withProfile";
import Composer from './../Composer';
import Post from './../Post';
import Spinner from './../Spinner';
import Postman from './../Postman';
import Counter from './../Counter';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from './../../config/api';
import { socket } from './../../socket/init';


@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isPostFetching: false
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();
        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${ meta.authorLastName }`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter(post => post.id !== removedPost.id),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
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

        this.setState({
            posts,
            isPostFetching: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();


        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isPostFetching: false,
        }));
    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts: posts.filter(post => post.id !== id),
            isPostFetching: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post
            ),
            isPostFetching: false,
        }));

    };

    _animateComposerEnter = (composer) => {
        fromTo(
            composer,
            1,
            { opacity: 0, rotationX: 120 },
            { opacity: 1, rotationX: 0 },
        );
    };

    render() {
        const {posts, isPostFetching} = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = {
                        {
                            enter: Styles.postInStart,
                            enterActive: Styles.postInEnd,
                            exit: Styles.postOutStart,
                            exitActive: Styles.postOutEnd,
                        }
                    }
                    key = {post.id}
                    timeout = {
                        {
                            enter: 500,
                            exit: 700,
                        }
                    }
                >
                    <Catcher>
                        <Post
                            {...post}
                            _likePost = { this._likePost }
                            _removePost = { this._removePost }
                        />
                    </Catcher>
                </CSSTransition>
            )
        });

        return (
            <section className={Styles.feed}>
                <Spinner isPostFetching={isPostFetching}/>
                <Transition
                    in
                    appear
                    timeout = { 4000 }
                    onEnter = { this._animateComposerEnter }
                >
                    <Composer _createPost={this._createPost}/>
                </Transition>
                <Postman />
                <Counter count = { postsJSX.length } />
                <TransitionGroup>{postsJSX}</TransitionGroup>
            </section>
        );
    }
}