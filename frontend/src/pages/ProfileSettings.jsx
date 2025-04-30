import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function ProfileSettings({loggedUser}) {
    const [userPosts, setUserPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    async function createPost(title, content) {
        const response = await axios.post('http://127.0.0.1:8000/api/posts/', {title, content, loggedUser});
        try {
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

    return (
        <>
            <h1>Your posts: </h1>
                <div>
                    {userPosts.map((post) => {
                        return (
                            <div>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                            </div>
                        )
                    })}   
                </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                createPost(title, content, loggedUser);
            }}>
                <h2>New Post</h2>
                <label for="title">Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label for="content">Content</label>
                <input id="content" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={logOut}>Log out</button>
        </>
    )
}

export default ProfileSettings