import {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/chats.css'


function Chats({userUsername}) {
    const [friends, setFriends] = useState([]);
    
    const token = localStorage.getItem('token');

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

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <div id='chats'>
            {friends.map(friend => (
                <div className='chat' key={friend.id}>
                    <h2 className='chat-name'>{friend.user1 === userUsername ? friend.user2 : friend.user1}</h2>
                </div>
            ))}
        </div>
    )
}

export default Chats