import {useState} from 'react'
import { Link } from 'react-router-dom';
import './login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <form>
                <label htmlFor="username" className="label">Username</label>
                <input className="input" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label class name="label" htmlFor='password'>Password</label>
                <input className='input' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <button id='login'>Login</button>
            </form>
        </>
    )
}

export default Login