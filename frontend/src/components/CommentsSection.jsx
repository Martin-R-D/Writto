import { useEffect, useState } from "react";
import axios from "axios";

function CommentsSection({post_id}) {
    const [newComment, setNewComment] = useState('');   
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');

    async function fecthComments() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/comments/', {
                headers: {
                    'Authorization': `Token ${token}`
                },
                params: {
                    post_id: post_id
                }
            });
            if(response.status === 200) setComments(response.data);
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function createComments() {
        try {
            alert("Post id = " + post_id + '   content =' + newComment);
            const response = await axios.post('http://127.0.0.1:8000/api/comments/', {content: newComment, post: post_id}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 201) fecthComments();
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
        setNewComment('');
    }

    useEffect(() => {
        fecthComments();
    }, [post_id]);

    return (
        <div id='commentsSection'>
            <div id='comments'>
                {comments.map((comment) => {return (
                    <div key={comment.id}>
                        <p>{comment.author}</p>
                        <h3>{comment.content}</h3>
                        <p>{comment.created_at}</p>
                    </div>
                )})}
            </div>
            <input autoComplete="off" id='commentInput' placeholder='Add a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
            <button id='commentButton' onClick={() => createComments()}>Post</button>
        </div>
  );
}   

export default CommentsSection