import React from 'react'
import './Profile.css'

const Profile = (props) => {
    // console.log(props.profile.name);
    const data = props.profile
    console.log(props.userposts)
    console.log(data.name);
    
    return (
        <div>
            <div className="profile-container">
                <div className="profile-image">
                    <img src={data.image} alt="" className="w-100" />
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
            </div>
            <div className="user-all_posts">
                {
                    props.userposts.map( userpost => (
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
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Profile