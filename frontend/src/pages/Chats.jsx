import {useState, useEffect, use} from 'react'
import axios from 'axios'


function Chats() {
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
                    
                </div>
            ))}
        </div>
    )
}

export default Chats