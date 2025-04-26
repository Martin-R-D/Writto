import {useState} from 'react'
import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({setIsLoggedIn}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function loginUser(username, password) {
        if(username.trim() === '') return;
        if(password.trim() === '') return;
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {username, password});
            if(response.status === 200) {setIsLoggedIn(true); navigate('/home');}
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                loginUser(username, password);
            }}>
                <label htmlFor="username" className="label">Username</label>
                <input className="input" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className="label" htmlFor='password'>Password</label>
                <input className='input' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <button type='submit' id='login'>Login</button>
            </form>
        </>
    )
}

export default Login