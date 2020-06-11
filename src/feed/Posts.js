import React, {useEffect, useState} from 'react'
import Post from './post/Post'

const Posts = () => {
    const [posts, setPosts] = useState([])
    // const post_data = [
    //     {
    //         id: 1,
    //         postTitle: "Shopping i have done",
    //         postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3G4BoM9FOqPMTDoFYIZ9zs4LFuMINnYgvFLco4QQqsIG4OLGM&usqp=CAU",
    //         postDesc: "This are the things i have gathered by passing throught shopping mall"
    //     },
    //     {
    //         id: 2,
    //         postTitle: "I am listening to",
    //         postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST0e8R9GstZR0OKS86n-6ZgZdRneI8YPG49COmIZNuT2TpevPx&usqp=CAU",
    //         postDesc: "I am loving this song since 3years back. #loopsong"
    //     },
    //     {
    //         id: 3,
    //         postTitle: "Todays work update",
    //         postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNCSxl23acngx8msi0Wz1bnMGUy0lFUJ43rFFQE4gKzWNT40ao&usqp=CAU",
    //         postDesc: "I am working from HOME..........."
    //     },
    //     {
    //         id: 4,
    //         postTitle: "My family gathering",
    //         postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-uunRuN1m3jAtk-R4Ho6HxrTs0D40lGqQR5nc6YP3GYWS8L4O&usqp=CAU",
    //         postDesc: "Last holiday with family"
    //     },
    //     {
    //         id: 5,
    //         postTitle: "Friend Forever",
    //         postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4xIYEogV_inP3iuLxNwUPoqdsaiusU4SJkA6cv8O3xQoOwq63&usqp=CAU",
    //         postDesc: "Friends been alwayd=s best part of life"
    //     },
    //     {
    //         id: 6,
    //         postTitle: "Nature is Love",
    //         postImage: "https://scx1.b-cdn.net/csz/news/800/2019/2-nature.jpg",
    //         postDesc: "Always best place .... is Nature......"
    //     }
    // ]

    // let newPost = {
    //     id: 5,
    //     postTitle: "Friend Forever",
    //     postImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4xIYEogV_inP3iuLxNwUPoqdsaiusU4SJkA6cv8O3xQoOwq63&usqp=CAU",
    //     postDesc: "Friends been alwayd=s best part of life"
    // }

    // post_data.push(newPost)
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
                console.log(posts);
            }
            catch(err) {
                console.log('failer to fetch');
                
            }
        }
        fetchPosts()
    },[])


    return (
        <Post posts={posts} />
    )
}

export default Posts