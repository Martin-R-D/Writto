import {useState, useEffect} from 'react'
import axios from 'axios';
import '../styles/inbox.css'

function Inbox() {
    const [invites, setInvites] = useState([]);

    async function fetchInvites() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            if(response.status === 200) setInvites(response.data);
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchInvites();
    }, []);

    return (
        <>
            <h2 id='pendingInvitesHeading'>Pending invites: </h2>
            <div id='pendingInvites'>
                {invites.map((invite) => {
                    return (
                        <div className='invite'>
                            <h3 className='inviteHeading'>Pending invite from {invite.from_user}</h3>
                            <button className = 'accept'>Accept</button>
                            <button className='reject'>Reject</button>
                        </div>
                    );
                })}
            </div>
        </>
        
    )
}

export default Inbox;