import { useState } from "react";


function CommentsSection({post_id}) {
    const [newComment, setNewComment] = useState('');   
    const [comments, setComments] = useState([]);
    return (
        <div id='commentsSection'>
            <div id='comments'>
                
            </div>
            <input autoComplete="off" id='commentInput' placeholder='Add a comment...' value={newComment} onChange={(e) => e.target.value}/>
            <button id='commentButton'>Post</button>
        </div>
  );
}   

export default CommentsSection