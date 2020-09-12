import React, {useState, useEffect, useContext, Fragment} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import * as idb from 'idb'

const AddPost = () => {
    const auth = useContext(AuthContext)
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: '',
    })
    const [file, setFile] = useState()
    const [value, setvalue] = useState([])
    const [previewUrl, setPreviewUrl] = useState();
    const [hashtags, setHashtags] = useState('')
    const [hashtagValues, setHaashtagValues] = useState([])

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

    const handleHashtagChange = (e) => {
        setHashtags(e.target.value)
    }
    console.log(hashtags);
    

    const addHashtagHandler = () => {
        if (hashtagValues.length >= 20) {
            alert('Cannot add more than 20 hashtags');
            return
        }
        setHaashtagValues(hashtagValues => hashtagValues.concat(hashtags))
    }
    if(hashtagValues.length > 0) {
        hashtagValues.map(hash => {
            console.log(hash);
        })
    }
    else {}
    const removeHashtagHandler = (index) => {
        const arr = hashtagValues
        arr.splice(index, 1)
        setHaashtagValues(hashtagValues => hashtagValues.concat(arr))
    }
    console.log(hashtagValues);
    const hashtagss = ["#hash1", "hash2"]
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
            formData.append('hashtags', hashtagValues)
            formData.append('image', file)
            formData.append('author', auth.userId)
            // console.log(formData);
            const post_data = await fetch(
                    'http://localhost:5000/api/social/posts',
                    {
                        method: 'POST',  
                        body : formData
                    }
                )
            // console.log(formData);
            history.push('/');
        }
        catch(err) {
            console.log('error occured man !!!');
            
        }

    }
    return (
        <Fragment>
            <div className="add-post_form">
                <div className="add-post_form-head">
                    Create Post
                </div>
                <form>
                    <div>
                        <input type="text" name="title" onChange={handleChange} placeholder="Enter post title" />
                    </div>
                    <div>
                        <input type="text" name="description" onChange={handleChange} placeholder="Enter post description" />
                    </div>
                    <div>
                        <input type="text" name="hashtags" onChange={handleHashtagChange} placeholder="Enter your hashtags" />
                        <button type="button" onClick={addHashtagHandler}>Add</button>
                    </div>
                    { hashtagValues.length >= 0 && <div className="preview-hashtag">
                        {
                            hashtagValues.map((hash, i) => (
                                <div className="hashtag-single" key={i} onClick={() => { removeHashtagHandler(i) }}>
                                    {hash}
                                </div>
                            ))
                        }
                    </div> }
                    { previewUrl && <div className="image-preview-add-post">
                        <img src={previewUrl} alt=""/>
                    </div> }
                    <div>
                        <input type="file" onChange={handleImageUpload} accept=".jpg, .png, .jpeg" />
                    </div>
                    <div>
                        <button type="button" onClick={addPostHandler}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AddPost