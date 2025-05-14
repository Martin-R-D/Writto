import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/posts.css'
import CommentsSection from "../components/CommentsSection";


function Posts() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');
    const [likedPosts, setLikedPosts] = useState([]); 
    const [showCommentsSection, setShowCommentsSection] = useState(false);
    const [commentsOpenedId, setCommentsOpenedId] = useState();
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

        fetchLikedPosts();
    }
    
    async function fetchLikedPosts() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/liked-posts/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setLikedPosts(response.data.postIds);
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
                if(response.data.action === 'like') {
                    e.target.src = '../images/redheart.png';
                    document.getElementById(post_id).innerHTML = parseInt(document.getElementById(post_id).innerHTML) + 1;
                }
                else {
                    e.target.src = '../images/heart.png';
                    document.getElementById(post_id).innerHTML = parseInt(document.getElementById(post_id).innerHTML) - 1;
                }
            }
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }

        fetchLikedPosts();
    }
    

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if(!showCommentsSection) {
            const element = document.getElementById(`comments${commentsOpenedId}`);
            if(element) element.src = '../images/comments.png';
        }
    }, [showCommentsSection]);

    function openComments(e, post_id) {
        if (e.target.src.endsWith('commentsFilled.png')) {
            setShowCommentsSection(false);
            e.target.src = '../images/comments.png';
            return;
        }
        const allCommentButtons = document.getElementsByClassName('commentsPostPage');
        for(let i = 0; i < allCommentButtons.length; i++) {
            allCommentButtons[i].src = '../images/comments.png';   
        }
        e.target.src = '../images/commentsFilled.png';
        setShowCommentsSection(true);
        setCommentsOpenedId(post_id);
    }

    return (
        <>
            <div id='optionsDiv'>
                <h2>For you</h2>
            </div>
            <div id='posts'>
            {posts.map((post) => {
                return (
                    <div className="postPostPage" key={post.id}>
                        <h4 className="authorNamePostPage">Author: {post.author}</h4>
                        <h2 className="postTitlePostPage">{post.title}</h2>
                        <p className="postContentPostPage">{post.content}</p>
                        <div className="postLikesPostPage">
                            <img className = 'heartPostPage' src={likedPosts.includes(post.id) ? '../images/redheart.png' : '../images/heart.png'} onClick={(e) => likePost(e, post.id)}/>
                            <p id={post.id}>{post.likes}</p>
                            <img className = 'commentsPostPage' id ={`comments${post.id}`} src='../images/comments.png' onClick={(e) => openComments(e, post.id)}/>
                        </div>
                    </div>
                )
            })}
            </div>
            {showCommentsSection && 
                <CommentsSection post_id={commentsOpenedId} func={() => setShowCommentsSection(false)}/>
            }
        </> 
    )
}

export default Posts;