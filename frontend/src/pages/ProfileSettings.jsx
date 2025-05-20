import { useState, useEffect } from "react"
import axios, { all } from "axios"
import { useNavigate } from "react-router-dom"
import '../styles/profile.css'
function ProfileSettings({userUsername}) {
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
        getUserPosts();
    }, []);

    function openComments(e, post_id) {
        if(e.target.src.endsWith('commentsFilled.png')) {
            e.target.src = '../images/comments.png';
            return;
        }
        const allCommentButtons = document.getElementsByClassName('comments');
        for(let i = 0; i < allCommentButtons.length; i++) {
            allCommentButtons[i].src = '../images/comments.png';   
        }
        e.target.src = '../images/commentsFilled.png';
    }
    return (
        <div id='profilePage'>        
            <h1 id='usernameHeader'>Hello, {userUsername}</h1>
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
                                <img className = 'comments' id ={`comments${post.id}`} src='../images/comments.png' onClick={(e) => openComments(e, post.id)}/>
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