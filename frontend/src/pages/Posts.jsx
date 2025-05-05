import axios from "axios";
import { useEffect, useState } from "react";



function Posts() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');

    async function fetchPosts() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
                headers: {
                    'Authorization': `Token ${token}`
                }, 
                params: {
                    exclude_user: true
                }
            });
            if(response.status === 200) setPosts(response.data);
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function likePost(post_id) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/like-post/', {post_id}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) fetchPosts();
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            {posts.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <h4 className="authorName">Author: {post.author}</h4>
                        <h2 className="postTitle">{post.title}</h2>
                        <p className="postContent">{post.content}</p>
                        <div className="postLikes">
                            <button onClick={() => likePost(post.id)}>Like</button>
                            <p>Likes: {post.likes}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Posts;