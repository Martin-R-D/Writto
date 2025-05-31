import { useState, useEffect } from "react"
import axios, { all } from "axios"
import { useNavigate } from "react-router-dom"
import CommentsSection from "../components/CommentsSection"
import '../styles/profile.css'
function ProfileSettings({userUsername}) {
    const [userPosts, setUserPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [openedCommentsId, setOpenedCommentsId] = useState(-1);
    const [showComments, setShowComments] = useState(false);
    const [image, setImage] = useState(null);
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

    async function createPost(title, content, image) {
        if(title.trim() === '' || content.trim() === '') return;
        if(!image) return;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
                if(response.status === 201) {
                    setUserPosts([...userPosts, response.data]);
                    setContent('');
                    setTitle('');
                    setImage(null);
                }
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

    useEffect(() => {
        if(!showComments) {
            const element = document.getElementById(`comments${openedCommentsId}`);
            if(element) element.src = '../images/comments.png';
        }
    }, [showComments])

    function openComments(e, post_id) {
        if(e.target.src.endsWith('commentsFilled.png')) {
            e.target.src = '../images/comments.png';
            setShowComments(false);
            return;
        }
        const allCommentButtons = document.getElementsByClassName('comments');
        for(let i = 0; i < allCommentButtons.length; i++) {
            allCommentButtons[i].src = '../images/comments.png';   
        }
        e.target.src = '../images/commentsFilled.png';
        setOpenedCommentsId(post_id);
        setShowComments(true);
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
                                <img className='postImage' src={post.image} alt="post image"/>
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
            {showComments && <CommentsSection post_id={openedCommentsId} func={() => setShowComments(false)}/>}
            <form id='profileForm' onSubmit={(e) => {
                e.preventDefault()
                createPost(title, content, image);
            }}>
                <h2 id='newPostHeading'>New Post</h2>
                <label htmlFor="title">Title</label>

                <input id="title" type="text" value={title} autoComplete='off' onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="image">Image</label>

                <img id='imagePreview' src={image ? URL.createObjectURL(image):'../images/defaultImage.jpg'} alt='preview'/>
                <input id="image" type="file" autoComplete='off' onChange={(e) => setImage(e.target.files[0])}/>

                <label htmlFor="content">Content</label>
                <input id="content" type="text" value={content} autoComplete='off' onChange={(e) => setContent(e.target.value)}/>

                <button type="submit" id='createPost'>Post</button>
            </form>
            <button id='logout' onClick={logOut}>Log out</button>
        </div>
    )
}

export default ProfileSettings