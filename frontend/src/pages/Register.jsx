import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import '../styles/register.css'
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function registerUser(username, password) {
        if(username.trim() === '') return;
        if(password.trim() === '') return;
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {username, password});
            if(response.status === 201) navigate('/login')
            else throw new Error(response.data);
        } catch(err) {
            alert(err);
        }
    }
    return (
        <>
            <form id='registerForm'onSubmit={(e) => {
                e.preventDefault();
                registerUser(username, password);
            }}>
                <label htmlFor="username" className="label">Username</label>
                <input className="input" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
                <label className="label" htmlFor='password'>Password</label>
                <input className='input' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p id='haveAccount'>Already have an account? <Link to="/login">Login</Link></p>
                <button id='register'>Register</button>
            </form>
        </>
    )
}

export default Register