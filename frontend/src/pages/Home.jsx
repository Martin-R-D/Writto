import { Link } from 'react-router-dom'
import Posts from "./Posts";
import Friends from "./Friends";
import Inbox from "./Inbox";
import ProfileSettings from "./ProfileSettings";
import { useState } from "react";
import './home.css'

function Home() {
    const isLoggedIn = localStorage.getItem('token');
    const [page, setPage] = useState(1);

    if (!isLoggedIn) return (
        <>
            <h1>Not logged in</h1>
            <Link to='/login'>Login</Link>
        </>
        );

    function renderCurrentPage() {
        switch(page) {
            case 1:
                return <Posts/>
            case 2:
                return <Inbox/>
            case 3:
                return <Friends/>
            case 4:
                return <ProfileSettings/>
        }
    }
        
    return (
        <>
       <nav>
            <div className='navElements' style={page===1 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(1)}>Posts</div>
            <div className="navElements" style={page===2 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(2)}>Inbox</div>
            <div className="navElements" style={page===3 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(3)}>Friends</div>
            <div className="navElements" style={page===4 ? {backgroundColor:'#e0e0e0'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(4)}>Profile</div>
        </nav>
        {renderCurrentPage()}
       </>
    );
}
export default Home
