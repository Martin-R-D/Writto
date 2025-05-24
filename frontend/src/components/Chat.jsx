import {useState, useEffect} from 'react'
import axios from 'axios'

function Chat({userUsername, friend, showChatFunc}) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const friendUsername = friend.user1 === userUsername ? friend.user2 : friend.user1;
    const token = localStorage.getItem('token');


    async function sendMessage() {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/messages/', {receiver: friendUsername, content: currentMessage}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }); 
            if(response.status === 201) {
                setCurrentMessage('')
            }
        } catch(err) {
            alert(err);
        }
    }


    return (
        <div id='chat'>
            <div id='chatHeading'>
                <button id='closeChatBtn' onClick={() => showChatFunc(false)}>Close</button>
                <h2>{friendUsername}</h2>
            </div>
            <div id='messages'>

            </div>
            <input id='messageInput' value={currentMessage} placeholder='Enter message...' onChange={(e) => setCurrentMessage(e.target.value)} autoComplete='off'/>
            <button id='sendMessageButton' onClick={() => sendMessage()}>Send</button>
        </div>
    );
}

export default Chat