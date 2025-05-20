import { Link } from 'react-router-dom'
import Posts from "./Posts";
import Friends from "./Friends";
import Inbox from "./Inbox";
import ProfileSettings from "./ProfileSettings";
import Chats from "./Chats";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/home.css'

function Home() {
    const isLoggedIn = localStorage.getItem('token');
    const [page, setPage] = useState(1);

    if (!isLoggedIn) return (
        <>
            <h1>Not logged in</h1>
            <Link to='/login'>Login</Link>
        </>
        );

    const token = localStorage.getItem('token');
    const [userUsername, setUserUsername] = useState('');
    function renderCurrentPage() {
        switch(page) {
            case 1:
                return <Posts/>
            case 2:
                return <Inbox/>
            case 3:
                return <Friends userUsername={userUsername}/>
            case 4:
                return <ProfileSettings userUsername={userUsername}/>
            case 5:
                return <Chats userUsername={userUsername}/>
        }
    }

    async function getUser() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-user/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if(response.status === 200) setUserUsername(response.data.username);
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        getUser();
    }, []);
        
    return (
        <>
       <nav id='navbar'>
            <div className='navElements' style={page===1 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(1)}>Posts</div>
            <div className="navElements" style={page===2 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(2)}>Inbox</div>
            <div className="navElements" style={page===3 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(3)}>Friends</div>
            <div className="navElements" style={page===5 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(5)}>Chats</div>
            <div className="navElements" style={page===4 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(4)}>Profile</div>
        </nav>
        <div id="pageContent">
            {renderCurrentPage()}
        </div>
       </>
    );
}
export default Home
