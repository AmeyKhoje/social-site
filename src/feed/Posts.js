import React, {useEffect, useState} from 'react'
import Post from './post/Post'
import { RingLoader } from 'react-spinners'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [ postAuthors, setPostAuthors ] = useState([])
    const [ postAuthor, setPostAuthor ] = useState([])
    const [ loadingPost, setLoadingPost ] = useState(false)
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoadingPost(true)
                const postsFetch = await fetch('http://localhost:5000/api/social/post')
                
                const fetchData = await postsFetch.json()
                // console.log(fetchData.posts);
                // JSON.stringify(fetchData)
                // console.log(fetchData);
                const finalData = fetchData.posts
                console.log(finalData);
                setPosts(finalData)
                setLoadingPost(false)
            }
            catch(err) {
                console.log('failer to fetch');
            }
        }
        fetchPosts()
    },[])
    // console.log(posts);
    

    useEffect(() => {
        const fetchUsersPost = async() => {
            try {
                const postsFetched = await fetch(`http://localhost:5000/api/users`)
                let postFetchedData = await postsFetched.json()
                let postFetchedDataFinal = postFetchedData.users
                setPostAuthors(postFetchedDataFinal)
                console.log(postFetchedDataFinal);
                
                
            } catch (error) {
                console.log('error')
            }
        }
        fetchUsersPost()
    }, [])
    const dataUser = postAuthors
    let duUserId = []
    dataUser.map(du => {
        duUserId = du._id
        // setPostAuthor(du._id)
        console.log(duUserId);
    })
    
    
    
    return (
        <div>
            <Post posts={posts} author={postAuthors} loading={loadingPost} />
        </div>
    )
}

export default Posts