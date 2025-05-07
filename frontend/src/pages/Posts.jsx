import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/posts.css'


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

    async function likePost(e, post_id) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/like-post/', {post_id}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) {
                if(response.data.action === 'like') e.target.src = '../images/redheart.png';
                else e.target.src = '../images/heart.png';
                fetchPosts();
            }
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
            <div id='optionsDiv'>
                <h2>For you</h2>
                <h2>Liked</h2>
            </div>
            <div id='posts'>
            {posts.map((post) => {
                return (
                    <div className="postPostPage" key={post.id}>
                        <h4 className="authorNamePostPage">Author: {post.author}</h4>
                        <h2 className="postTitlePostPage">{post.title}</h2>
                        <p className="postContentPostPage">{post.content}</p>
                        <div className="postLikesPostPage">
                            <img class = 'heartPostPage' src='../images/heart.png' onClick={(e) => likePost(e, post.id)}/>
                            <p>{post.likes}</p>
                        </div>
                    </div>
                )
            })}
            </div>
        </>
    )
}

export default Posts;