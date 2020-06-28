import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import Profile from '../Profile'

const ProfileInfo = () => {
    const auth = useContext(AuthContext)
    const [userPosts, setUserPOsts] = useState([])
    const [posts, setPosts] = useState([])
    console.log(auth.userId);

    useEffect(() => {
        const fetchUserPosts = async() => {
            try {
                const profilePosts = await fetch(`http://localhost:5000/api/users/profile/${auth.userId}`)
                let profileData = await profilePosts.json()
                const data = profileData.profile
                setUserPOsts(data)
            } catch (error) {
                console.log('error occured', error);
            }
        }
        fetchUserPosts()
    }, [])
    useEffect(() => {
        const getUserPosts = async() => {
            try {
                const userPosts = await fetch(`http://localhost:5000/api/social/postuser/${auth.userId}`)
                let userPostsData = await userPosts.json()
                const finalUserPosts = userPostsData.posts
                console.log(finalUserPosts);
                setPosts(finalUserPosts)
            } catch (error) {
                console.log('error to fetch user posts');
            }
        }
        getUserPosts()
    }, [])
    console.log(userPosts);
    return ( <
        Profile profile = { userPosts }
        userposts = { posts }
        darkMode = { auth.isDark }
        />
    )
}

export default ProfileInfo