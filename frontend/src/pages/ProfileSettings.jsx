import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import './profile.css'
function ProfileSettings() {
    const [userPosts, setUserPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');


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


    function logOut() {
        localStorage.removeItem('token');
        navigate('/login');
    }
    useEffect(() => {
        getUserPosts();
    }, []);
    return (
        <>  
            <h1 id='yourPostsHeader'>Your posts: </h1>
                <div id='yourPosts'>
                    {userPosts.map((post) => {
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
                </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                createPost(title, content);
            }}>
                <h2>New Post</h2>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="content">Content</label>
                <input id="content" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            <button id='logout' onClick={logOut}>Log out</button>
        </>
    )
}

export default ProfileSettings