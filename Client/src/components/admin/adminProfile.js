import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const AdminProfile = () => {
    const disabledDefault = {
        account: true
    }

    const axios = useAxiosPrivate();
    const bufferToBase64 = (bufferArray) => {
        const chunkSize = 100000;
        let base64String = '';

        for (let i = 0; i < bufferArray.length; i += chunkSize) {
            const chunk = bufferArray.slice(i, i + chunkSize);
            base64String += String.fromCharCode.apply(null, chunk);
        }

        return btoa(base64String);
    }

    const [disabled, setDisabled] = useState(disabledDefault);
    const [profile, setProfile] = useState('');
    const [username, setUsername] = useState('');
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const fetchAdmin = async () => {
        try {
            const response = await axios.get('/admin/details')

            const admin = response?.data
            setUsername(admin?.username);
            setProfile(`data:image/jpeg;base64,${bufferToBase64(admin?.profile?.data)}`);

        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get('/admin/details')

                const admin = response?.data
                setUsername(admin?.username);
                setProfile(`data:image/jpeg;base64,${bufferToBase64(admin?.profile?.data)}`);

            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchAdmin();
    }, [axios]);

    const handleUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/username', { newUsername: username });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/password', { prevPassword, newPassword });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setPrevPassword('');
            setNewPassword('');
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleProfile = async (e) => {
        e.preventDefault();
        try {
            const profile = document.getElementById("profile");
            const fd = new FormData();
            fd.append('profile', profile.files[0]);
            if (!fd) return

            const response = await axios.post('/admin/profile', fd,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

            const success = response?.data?.success;
            if (success)
                notify('success', success);

            fetchAdmin();
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            {/* Profile */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <h2>Profile</h2>

                            <div className='d-flex align-items-center'>

                                {profile && <img src={profile} height={'100'} alt='profile' />}

                                <div className="card-body">
                                    <div className="flex-nowrap">
                                        <label htmlFor="profile" className="form-label"><b>Profile pic</b></label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="profile"
                                            name='profile'
                                        />
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <label className="form-label fs-6">File should be lessthan 2 mb and<br /> only jpeg, jpg and png's allwoed</label>
                                        <button className="btn btn-primary m-2" onClick={handleProfile}>upload</button>
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {/* Account */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <div className='d-flex justify-content-between'>
                                <h2>Account</h2>

                                {disabled.account && (
                                    <div >
                                        <button onClick={(e) => setDisabled(prev => ({ ...prev, account: false }))} className="btn btn-dark">Edit</button>
                                    </div>
                                )}
                            </div>

                            <fieldset disabled={disabled.account}>

                                <div className='d-flex flex-row'>

                                    <div>

                                        <div className="card-body">
                                            <div className="form-floating flex-nowrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Username'
                                                    id='username'
                                                    minLength={8}
                                                    maxLength={30}
                                                    autoComplete='off'
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor='username'>Username</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <button onClick={handleUsername} className="btn btn-primary">edit</button>
                                        </div>

                                    </div>

                                    <div>

                                        <div className="card-body">
                                            <div className="form-floating flex-nowrap">
                                                <input
                                                    className="form-control"
                                                    type="password"
                                                    autoComplete='off'
                                                    id='prevPassword'
                                                    placeholder='Previous password'
                                                    value={prevPassword}
                                                    min={8}
                                                    onChange={(e) => setPrevPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor='prevPassword'>Previous password</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="form-floating flex-nowrap">
                                                <input
                                                    autoComplete='off'
                                                    className="form-control"
                                                    type="password"
                                                    id='newPassword'
                                                    placeholder='New password'
                                                    value={newPassword}
                                                    min={8}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor='newPassword'>New password</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <button onClick={handlePassword} className="btn btn-primary">edit</button>
                                        </div>

                                    </div>

                                </div>

                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default AdminProfile