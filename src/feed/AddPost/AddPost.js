import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import * as idb from 'idb'

const AddPost = () => {
    const auth = useContext(AuthContext)
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: ''
    })
    const [file, setFile] = useState()
    const [value, setvalue] = useState([])
    const [previewUrl, setPreviewUrl] = useState();

    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
      }
      else {
          console.log('supports');
      }

      useEffect(() => {
        if (!file) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      }, [file]);
    
    const handleChange = (e) => {
        const value = e.target.value
        setPost({
            ...post,
            [e.target.name]: value
        })

        
    }
    const handleImageUpload = event => {
        let pickedFile = event.target.files[0]
        setFile(pickedFile)
    }
    console.log(file);
    
    const newPost = []
    const history = useHistory();
    const addPostHandler = async(event) => {
        event.preventDefault()
        // newPost.push(post)
        // try {
        //     const {title, description, image} = post
        //     localStorage.setItem('postTitle', title)
        //     localStorage.setItem('postdesc', description)
        //     localStorage.setItem('postImg', image)
        //     console.log(post);
        
        // } catch (error) {
        //     console.log('fail');
            
        // }
        // const { title, descriptionm, image } = post
        try{
            console.log(post.title);
            const formData = new FormData()
            formData.append('title', post.title)
            formData.append('description', post.description)
            // formData.append('img', post.image)
            formData.append('image', file)
            formData.append('author', auth.userId)
            
            const post_data = await fetch(
                    'http://localhost:5000/api/social/posts',
                    {
                        method: 'POST',  
                        body : formData
                    }
                )
            console.log(post_data);
            history.push('/');
        }
        catch(err) {
            console.log('error occured man !!!');
            
        }

    }
    return (
        <form>
            <div>
                <input type="text" name="title" onChange={handleChange} />
            </div>
            <div>
                <input type="text" name="description" onChange={handleChange} />
            </div>
            <div>
                <input type="file" onChange={handleImageUpload} accept=".jpg, .png, .jpeg" />
            </div>
            <div>
                <button type="button" onClick={addPostHandler}>
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AddPost