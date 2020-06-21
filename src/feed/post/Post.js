import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Post.css'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Grid, CardActions } from '@material-ui/core'
// import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const Post = props => {
    // console.log(props.author);
    const [ postAuthor, setPostAuthor ] = useState('')
    const [ likedState, setLikedState ] = useState({
        liked: false,
        value: 0
    })
    const posts = props.posts
    console.log(posts);
    
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
    let likeClass = likedState.liked ? 'btn-liked' : 'btn-unliked'
    let linked = (<Link to="/addpost" >Create New Post</Link>)
    
    return (
        <div>
        <Grid className="posts-container" lg="9">
            {
                posts.map(post => {
                    return (
                        <Card className="post-card" key={post.id}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe">
                                    R
                                </Avatar>
                                }
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                }
                                title={post.title}
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                src={post.image}
                                image={post.image}
                                title="Paella dish"
                            >
                                <img src={post.image} alt="" className="w-100 post-image" />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {post.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" className={likeClass} onClick={onLikeHandler}>
                                    <FavoriteIcon />
                                </IconButton>
                                {/* <IconButton aria-label="share">
                                <ShareIcon />
                                </IconButton>
                                <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </IconButton> */}
                            </CardActions>
                        </Card>
                    )
                })
            }
        </Grid>
        </div>
    )    
}


export default Post