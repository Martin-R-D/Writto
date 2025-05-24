import {useState, useEffect} from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import '../styles/chat.css'

function Chat({userUsername, friend, showChatFunc}) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const friendUsername = friend.user1 === userUsername ? friend.user2 : friend.user1;
    const token = localStorage.getItem('token');

    async function fetchMessages() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/messages/${friendUsername}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setMessages(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function sendMessage() {
        if(currentMessage.trim() === '') return;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/messages/', {receiver: friendUsername, content: currentMessage}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }); 
            if(response.status === 201) {
                setCurrentMessage('')
                fetchMessages();
            }
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <div id='chat'>
            <div id='chatHeading'>
                <button id='closeChatBtn' onClick={() => showChatFunc(false)}>Close</button>
                <h2>{friendUsername}</h2>
            </div>
            <div id='messages'>
                {messages.map((message) => {
                    return (
                        <div className={message.sender === userUsername ? 'messageSent' : 'messageReceived'} key={message.id}>
                            <p className='messageSender'>{message.sender}</p>
                            <h3 className='messageContent'>{message.content}</h3>
                            <small className='messageTime'>{dayjs(message.time).format("YYYY-MM-DD HH:mm")}</small>
                        </div>
                    )
                })}
            </div>
            <input id='messageInput' value={currentMessage} placeholder='Enter message...' onChange={(e) => setCurrentMessage(e.target.value)} autoComplete='off'/>
            <button id='sendMessageButton' onClick={() => sendMessage()}>Send</button>
        </div>
    );
}

export default Chat