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

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            {posts.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <button className='delete'>X</button>
                        <h4 className="authorName">Author: {post.author}</h4>
                        <h2 className="postTitle">{post.title}</h2>
                        <p className="postContent">{post.content}</p>
                        <div className="postLikes">
                            <button onClick={() => alert('You cannot like your own post')}>Like</button>
                            <p>Likes: {post.likes}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Posts;