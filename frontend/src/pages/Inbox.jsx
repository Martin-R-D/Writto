import {useState, useEffect} from 'react'
import axios from 'axios';
import '../styles/inbox.css'

function Inbox() {
    const [invites, setInvites] = useState([]);
    const [sentInvites, setSentInvites] = useState([]);
    const token = localStorage.getItem('token');
    async function fetchInvites() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setInvites(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function fetchSentInvites() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
                headers: {
                    'Authorization': `Token ${token}`
                }, 
                params: {
                    sentInvites: true
                }
            });
            if(response.status === 200) setSentInvites(response.data);
        } catch(err) {
            alert(err);
        }
    }

    async function cancelRequest(id) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/friend-requests/${id}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            if(response.status === 200) fetchSentInvites();
        } catch(err) {
            alert(err);
        }
    }

    async function rejectRequest(id) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/friend-requests/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) fetchInvites();
        } catch(err) {
            alert(err);
        }
    }

    async function acceptRequest(username) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/friends/`, {username: username}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 201) fetchInvites();
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchInvites();
        fetchSentInvites();
    }, []);

    return (
        <>
            <h2 id='pendingInvitesHeading'>Pending invites: </h2>
            <div id='pendingInvites'>
                {invites.map((invite) => {
                    return (
                        <div className='invite'>
                            <h3 className='inviteHeading'>Pending invite from {invite.from_user}</h3>
                            <button className = 'accept' onClick={() => acceptRequest(invite.from_user)}>Accept</button>
                            <button className='reject' onClick={() => rejectRequest(invite.id)}>Reject</button>
                        </div>
                    );
                })}
            </div>

            <h2 id='sentInvitesHeading'>Sent invites: </h2>
            <div id='sentInvites'>
                {sentInvites.map((invite) => {
                    return (
                        <div className='sentInvite' key={invite.id}>
                            <h3 className='sentInviteHeading'>Request sent to <strong>{invite.to_user}</strong></h3>
                            <button className='deleteInvite' onClick={() => cancelRequest(invite.id)}>Cancel</button>
                        </div>
                    );
                })}
            </div>
        </>
        
    )
}

export default Inbox;