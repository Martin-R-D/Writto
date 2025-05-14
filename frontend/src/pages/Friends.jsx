import {useState} from 'react'
import axios from 'axios';

function Friends() {
    const [search, setSearch] = useState('');
    const token = localStorage.getItem('token');
    async function sendFriendRequest() {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/friend-requests/', {username: search}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 201) {
                alert('Friend request sent');
            }
        } catch(err) {
            alert(err.response.data.error);
        }
    }
    return (
        <>
        <form onSubmit={(e) => {
            e.preventDefault()
            
            }}>
         <label htmlFor='search'>Look for a user</label>
         <input id='search' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
         <button type='submit' onClick={(e) => {
            e.preventDefault();
            sendFriendRequest();
         }}>Send friend request</button>
         </form>
        </>
    )
}

export default Friends