import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

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
    return (
        <div>
            <div>
                <input type="text" name="title" onChange={handlechange} value={formDataToUpdate.title} />
            </div>
            <div>
                <input type="text" name="description" onChange={handlechange} value={formDataToUpdate.description} />
            </div>
        </div>
    )
}

export default UpdatePost