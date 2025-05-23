import {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/chats.css'
import Chat from '../components/Chat';


function Chats({userUsername}) {
    const [friends, setFriends] = useState([]);
    const [chatOpened, setChatOpened] = useState(false);
    const [clickedFriend, setClickedFriend] = useState([]);
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
        <>
        {!chatOpened && <div id='chats'>
            {friends.map(friend => (
                <div className='chatElement' key={friend.id} onClick={() => {
                    setChatOpened(true)
                    setClickedFriend(friend)
                }}>
                    <h2 className='chat-name'>{friend.user1 === userUsername ? friend.user2 : friend.user1}</h2>
                </div>
            ))}
            {friends.length === 0 && <h1>You don't have any friends</h1>}
        </div>}
        {chatOpened === true && <Chat userUsername={userUsername} friend={clickedFriend} showChatFunc={setChatOpened}/>}
        </>
    )
}

export default Chats