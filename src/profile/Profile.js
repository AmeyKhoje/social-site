import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './Profile.css'

const Profile = (props) => {
    // console.log(props.profile.name);
    const data = props.profile
    

    // const deletePostHandler = async(e) => {
    //     e.preventDefault()

    //     await fetch(`http://localhost:5000/api/social/deletepost/${userpost.id}`)
    // }
    let darkClass = props.darkMode ? 'prof-dark' : 'prof-light'
    let darkProfPost = props.darkMode ? 'prof-card_dark' : 'prof-card_light'
    if(!data && !props.userposts){
        return (
            <h1 className={`  `}>
                You Dont Have Any Posts
            </h1>
        )
    }
    return (
        <div>
            {data && <div className={`profile-container ${darkClass}`}>
                <div className="profile-image">
                    <img src={data.image} alt="" />
                </div>
                <div className="profile-info">
                    <div>
                        <h3>
                            {data.name}
                        </h3>
                    </div>
                    <div>
                        <p>
                            {data.email}
                        </p>
                    </div>
                </div>
            </div>}
            <div className={`user-all_posts ${darkProfPost}`}>
                {
                    props.userposts && props.userposts.map( userpost => (
                        <div className="user-posts_container">
                            <div className="user-post_title">
                                {userpost.title}
                            </div>
                            <div className="user-post_description">
                                {userpost.description}
                            </div>
                            <div>
                                <img src={userpost.image} alt="" className="w-100"/>
                            </div>
                            <div className="userpost-actions">
                                <div className="userpost-update">
                                    <Link to={`post/${userpost.id}`}>Update</Link>
                                </div>
                                <div className="username-delete">
                                    <Button>Delete</Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    !props.userposts && <h4 className="text-center">
                        Your Dont Have Any Posts To Show
                    </h4>
                }
            </div>
        </div>
    )
}
export default Profile