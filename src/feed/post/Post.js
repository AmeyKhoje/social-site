import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Post.css'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Grid, CardActions } from '@material-ui/core'
// import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { RingLoader, ScaleLoader } from 'react-spinners'
import { AuthContext } from '../../context/auth-context'

const Post = props => {
    // console.log(props.author);
    const auth = useContext(AuthContext)
    const [ postAuthor, setPostAuthor ] = useState('')
    const [ likedState, setLikedState ] = useState({
        liked: false,
        value: 0
    })
    
    const posts = props.posts
    
    const authors = props.author
    // console.log(authors.name);
    // let elems = posts.concat(authors)
    // console.log(elems);
    // authors.map(author => {
    //     setPostAuthor(author)
    // })

    // posts.map(post => {
    //     if(post.author === setPostAuthor.id) {
    //         console.log(post.author)
    //     }
    // })
    
    // posts.map(post => {
    //     // console.log(post.author)
    //     // if(post.author === authors) {}
    //     // setPostAuthor(author)
    // })

    // if(postAuthor.id === posts.id) {
    //     // console.log('match', postAuthor.id)
    // }
    // else {
    //     console.log('not match')
    // }

    const onLikeHandler = () => {

        if(likedState.liked === true) {
            setLikedState({
                liked: false
            })
        }
        else {
            setLikedState({
                liked: true
            })
        }
    }

    let darkClass = auth.isDark ? 'posts-dark' : 'posts-light'
    let likeClass = likedState.liked ? 'btn-liked' : 'btn-unliked'
    let linked
    if(posts.length === 0) {
        linked = (<div className="create-post_link-cont"><Link to="/addpost" className="create-post_link" >Create New Post</Link></div>)
    }
    else {
        linked = (<div>
            {props.loading && <ScaleLoader className="spinner" loading={props.loading} color={"#D73636"} height={40} width={5} radius={2} margin={3} />}
        <Grid className={`posts-container ${darkClass}`} sm="12" lg="12">
            {
                posts.map(post => {
                    return (
                        <div className="post-card_cust">
                            <div className="post-card_cust-avatar">
                                <div className="avatar-image">
                                    <img src="data:image/jpeg;base64,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" alt=""/>
                                </div>
                                <div className="avatar-info">
                                    <h5 className="avatar-name">
                                        Amey Khoje
                                    </h5>
                                    <span className="posted-date">
                                        {post.createdAt}
                                    </span> 
                                </div>
                            </div>
                            <div className="post-card_cust-container">
                                <div className="post-card_cust-img">
                                    <img src={post.image} alt=""/>
                                </div>
                                <div className="post-card_cust-body">
                                    <div className="post-card_cust-title">
                                        {post.title}
                                    </div>
                                    <div className="post-card_cust-desc">
                                        {post.description}
                                    </div>
                                    <div>
                                        {
                                            post.hashtags.map(hash => (
                                                <div className="post-card_cust-hashtags">
                                                    {hash}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* <div className="post-card_cust-footer">
                                    <button className="like-btn">Like</button>
                                    <p>
                                        <span>89</span> Likes
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    )
                })
            }
        </Grid>
        </div>)
    }
    return (
        <div>
            {linked}
            
        </div>
    )    
}


export default Post