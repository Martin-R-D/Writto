import {useState, useEffect, use} from 'react'
import axios from 'axios';

function Friends() {
    const [search, setSearch] = useState('');
    const [friends, setFriends] = useState([]);
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


    async function fetchFriends() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/friends/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setFriends(response.data.friends);
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchFriends();
    }, [])

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

         <div id='friends'>
            <h2 id='friendsHeading'>Your friends: </h2>
            <div id='friendsList'>
                {friends.map((username, index) => (
                    <div className='friend' key={index}>{username}</div>
                ))}
            </div>
         </div>
        </>
    )
}

export default Friends