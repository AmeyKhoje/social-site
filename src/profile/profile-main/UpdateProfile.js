import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {AuthContext} from '../../context/auth-context'
import nodemailer from 'nodemailer'

const UpdateProfile = () => {
    const auth = useContext(AuthContext)
    const [userPOsts, setUserPOsts] = useState([])
    const [userInfoToUpdate, setUserInfoToUpdate] = useState({
        name: '',
        email: ''
    })
    const id = auth.userId

    useEffect(() => {
        const fetchUserPosts = async() => {
            try {
                const profilePosts = await fetch(`http://localhost:5000/api/users/profile/${auth.userId}`)
                let profileData = await profilePosts.json()
                const data = profileData.profile
                setUserPOsts(data)
                setUserInfoToUpdate({
                    name: data.name,
                    email: data.email
                })
                
                
            } catch (error) {
                console.log('error occured', error);
            }
        }
        fetchUserPosts()
    },[])
    console.log(userInfoToUpdate);

    const changeHandler = (e) => {
        let value = e.target.value
        setUserInfoToUpdate({
            ...userInfoToUpdate,
            [e.target.name]: value
        })
    }

    const history = useHistory()
    const updateProfileHandler = async(event) => {
        event.preventDefault()

        try {
            await fetch(`http://localhost:5000/api/users/updateuser/${auth.userId}`,{
                method: 'PATCH',
                body:JSON.stringify({
                    name: userInfoToUpdate.name,
                    email: userInfoToUpdate.email
                }),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                auth.login(response.id)
                auth.userId(response.id)
            } )
            // history.push('/profile')
        } catch (error) {
            
        }
    }

    return (
        <div>
            <form onSubmit={updateProfileHandler}>
                <div>
                    <input type="text" name="name" value={userInfoToUpdate.name} onChange={changeHandler} />
                </div>
                <div>
                    <input type="email" name="email" value={userInfoToUpdate.email} onChange={changeHandler} />
                </div>
                <div>
                    <button type="submit" className="btn-profileupdate">Update Profile</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile