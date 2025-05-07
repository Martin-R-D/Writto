import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import '../styles/profile.css'
function ProfileSettings() {
    const [userPosts, setUserPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState('');

    async function getUser() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-user/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setUsername(response.data.username);
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function getUserPosts() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setUserPosts(response.data);
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function createPost(title, content) {
        if(title.trim() === '' || content.trim() === '') return;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/posts/', {title, content}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
                if(response.status === 201) setUserPosts([...userPosts, response.data]);
                else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }


    async function deletePost(post_id) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/posts/${post_id}/`, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            });
            if (response.status === 204) getUserPosts();
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    function logOut() {
        localStorage.removeItem('token');
        navigate('/login');
    }
    useEffect(() => {
        getUser();
        getUserPosts();
    }, []);
    return (
        <div id='profilePage'>        
            <h1 id='usernameHeader'>Hello, {username}</h1>
            <h1 id='yourPostsHeader'>Your posts: </h1>
                <div id='yourPosts'>
                    {userPosts.map((post) => {
                        return (
                            <div className="post" key={post.id}>
                                <button className='delete' onClick={() => deletePost(post.id)}>X</button>
                                <h4 className="authorName">Author: {post.author}</h4>
                                <h2 className="postTitle">{post.title}</h2>
                                <p className="postContent">{post.content}</p>
                                <div className="postLikes">
                                    <img className = 'heart' src='../images/heart.png' onClick={() => alert('You can not like your post')}/>
                                    <p>{post.likes}</p>
                                </div>
                            </div>
                        )
                    })}   
                </div>
            <form id='profileForm' onSubmit={(e) => {
                e.preventDefault()
                createPost(title, content);
            }}>
                <h2 id='newPostHeading'>New Post</h2>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={title} autoComplete='off' onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="content">Content</label>
                <input id="content" type="text" value={content} autoComplete='off' onChange={(e) => setContent(e.target.value)}/>
                <button type="submit" id='createPost'>Submit</button>
            </form>
            <button id='logout' onClick={logOut}>Log out</button>
        </div>
    )
}

export default ProfileSettings