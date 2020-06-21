import React, {useEffect, useState} from 'react'
import Post from './post/Post'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [ postAuthors, setPostAuthors ] = useState([])
    const [ postAuthor, setPostAuthor ] = useState([])
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsFetch = await fetch('http://localhost:5000/api/social/post')
                
                const fetchData = await postsFetch.json()
                // console.log(fetchData.posts);
                // JSON.stringify(fetchData)
                // console.log(fetchData);
                const finalData = fetchData.posts
                console.log(finalData);
                
                
                setPosts(finalData)
                let userFetch
                try {

                    finalData.map(dta => async() => {
                        console.log(dta.author);
                        userFetch = await fetch(`http;//localhost:5000/api/users/user/${dta.author}`)
                        setPostAuthor(userFetch)
                        console.log(postAuthor);
                        
                    })
                    console.log(fetchData.posts.id);
                    
                    // const postUser = await fetch(`http://localhost:5000/api/users/user/${}`)
                } catch (error) {
                    
                }
            }
            catch(err) {
                console.log('failer to fetch');
            }
        }
        fetchPosts()
    },[])

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


    return (
        <Post posts={posts} author={postAuthors} />
    )
}

export default Posts