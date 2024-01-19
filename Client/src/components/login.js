import React, { useState } from 'react'
import axios from '../api/axios';
import '../styles/form.css';
import { notify } from './toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password, role });
            const accessToken = response?.data?.accessToken;
            const success = response?.data?.success;
            localStorage.setItem('accessToken', accessToken);
            if (success)
                notify('success', success);

            navigate(from || '/user/' + role, { replace: true });
            setUsername('');
            setPassword('');
            setRole('');
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    };

    return (
        <>
            <div className='form'>
                <div className='d-inline-flex'>
                    <div className="card" style={{ backgroundColor: '#fff', width: '400px' }}>
                        <form className="card-body" onSubmit={handleSubmit}>

                            <h2>Login</h2>

                            <div className="card-body">
                                <div className="form-floating flex-nowrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id='username'
                                        placeholder='Username'
                                        autoComplete='off'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='username'>Username</label>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-floating flex-nowrap">
                                    <input
                                        className="form-control"
                                        autoComplete='off'
                                        type="password"
                                        id='password'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='password'>Password</label>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-floating flex-nowrap">
                                    <select id='role' required className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option defaultValue=''></option>
                                        <option value='admin'>Admin</option>
                                        <option value='student'>Student</option>
                                        <option value='recruiter'>Recruiter</option>
                                        <option value='college'>College</option>
                                    </select>
                                    <label htmlFor='role'>Role</label>
                                </div>
                            </div>

                            <div className="card-body">
                                <button type="submit" className="btn btn-primary" >Login</button>
                            </div>

                        </form>
                    </div>

                    <div id="ihnx5" style={{ width: '400px' }} className="d-flex flex-column text-wrap">
                        <h1 id="iwymk">Welcome To Talent Trail</h1>
                        <p id="ioe5g">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;