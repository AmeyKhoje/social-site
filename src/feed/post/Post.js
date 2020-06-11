import React from 'react'
import PropTypes from 'prop-types'
import './Post.css'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Grid } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const Post = props => {
    // console.log(props.posts);
    const posts = props.posts
    console.log(posts);
    
    return (
        <Grid className="posts-container" lg="9">
            {
                posts.map(post => {
                    return (
                        <Card className="post-card">
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
                            {/* <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
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
                                </IconButton>
                            </CardActions> */}
                        </Card>
    
                    )
                })
            }
        </Grid>
    )    
}


export default Post