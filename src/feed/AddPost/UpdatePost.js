import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const UpdatePost = () => {
    const [ postToUpdate, setPostToUpdate ] = useState([])
    const [ formDataToUpdate, setFormDataToUpdate ] = useState({
        title: '',
        description: ''
    })
    
    
    const postId = useParams().postId
    console.log(postId);

    useEffect(() => {
       const postToUpdateFunc = async() => {
            const postDataToUpdate = await fetch(`http://localhost:5000/api/social/post/${postId}`)
            const jsonPostToUpdate = await postDataToUpdate.json()
            // const finalPOstToUpdate = JSON.stringify(jsonPostToUpdate.posts)
            // setPostToUpdate(finalPOstToUpdate)
            console.log(jsonPostToUpdate.posts.title);
            setFormDataToUpdate({
                title: jsonPostToUpdate.posts.title,
                description: jsonPostToUpdate.posts.description
            })
           
       }
       postToUpdateFunc()
    },[postId])
    console.log(formDataToUpdate);
    const handlechange = (e) => {
        let value = e.target.value
        setFormDataToUpdate({
            ...formDataToUpdate,
            [e.target.name]: value
        })
        console.log(formDataToUpdate);
        
    }

    const history = useHistory()
        const postUpdater = async(e) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append('title', formDataToUpdate.title)
            formData.append('description', formDataToUpdate.description)
            console.log(formDataToUpdate.title);
            
            try {
                await fetch(`http://localhost:5000/api/social/updatepost/${postId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: formDataToUpdate.title,
                        description: formDataToUpdate.description
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                .then(response => response.json())
                .then(response => { console.log(response);
                 })
                // console.log(responseData);
                toast.success("Success Notification !", {
                    position: toast.POSITION.TOP_CENTER
                  });
                // history.push('/')
            } catch (error) {
                console.log('Cannot Update Post', error.toString());
                
            }
        }
    
    return (
        <div>
            <form onSubmit={postUpdater}>
                <div>
                    <input type="text" name="title" onChange={handlechange} value={formDataToUpdate.title} />
                </div>
                <div>
                    <input type="text" name="description" onChange={handlechange} value={formDataToUpdate.description} />
                </div>
                <div>
                    <button type="submit" className="btn-update">Update Post</button>
                </div>
            </form>
            <ToastContainer autoClose={8000} />
        </div>
    )
}

export default UpdatePost