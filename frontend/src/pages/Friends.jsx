import {useState, useEffect} from 'react'
import axios from 'axios';
import '../styles/friends.css'

function Friends({userUsername}) {
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
            if(response.status === 200) setFriends(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function removeFriend(id) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/friends/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) fetchFriends();
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
            <button id='sendRequestBtn' type='submit' onClick={(e) => {
                e.preventDefault();
                sendFriendRequest();
            }}>Send friend request</button>
         </form>

         <div id='friends'>
            <h2 id='friendsHeading'>Your friends: </h2>
            <div id='friendsList'>
                {friends.map((friend) => (
                    <div className='friend' key={friend.id} onMouseOver={() => {
                        document.getElementById(`removeFriend${friend.id}`).style.display = 'block';
                    }}
                    
                    onMouseLeave = {() => {
                        document.getElementById(`removeFriend${friend.id}`).style.display = 'none';	
                    }}
                    >
                        <p>{friend.user1 === userUsername ? friend.user2 : friend.user1}</p>
                        <button id={`removeFriend${friend.id}`} className='removeFriendBtn' style={{display: 'none'}} onClick={() => removeFriend(friend.id)}>X</button>
                    </div>
                ))}
            </div>
         </div>
        </>
    )
}

export default Friends