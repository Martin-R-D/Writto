import {useState, useEffect} from 'react'
import axios from 'axios'

function Chat({userUsername, friend, showChatFunc}) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const friendUsername = friend.user1 === userUsername ? friend.user2 : friend.user1;
    const token = localStorage.getItem('token');

    return (
        <div id='chat'>
            <div id='chatHeading'>
                <h2>{friendUsername}</h2>
            </div>
            <div id='messages'>

            </div>
            <input id='messageInput' value={currentMessage} placeholder='Enter message...' onChange={(e) => setCurrentMessage(e.target.value)} autoComplete='off'/>
            <button id='sendMessageButton'>Send</button>
            <button id='closeChatBtn' onClick={() => showChatFunc(false)}>Close</button>
        </div>
    );
}

export default Chat