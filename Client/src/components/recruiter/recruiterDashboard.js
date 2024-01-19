import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import '../../styles/dash.css'

const RecruiterDashboard = () => {
    const [posted, setPosted] = useState();
    const [applicantsSelected, setApplicantsSelected] = useState();
    const [applicantsRejected, setApplicantsRejected] = useState();
    const [applicants, setApplicants] = useState();
    const [username, setUsername] = useState();
    const [profile, setProfile] = useState('');

    const bufferToBase64 = (bufferArray) => {
        const chunkSize = 100000;
        let base64String = '';

        for (let i = 0; i < bufferArray.length; i += chunkSize) {
            const chunk = bufferArray.slice(i, i + chunkSize);
            base64String += String.fromCharCode.apply(null, chunk);
        }

        return btoa(base64String);
    }

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchRecruiter = async () => {
            try {
                const response = await axios.get('/recruiter')

                const recruiter = response?.data
                setPosted(recruiter?.posted || 0);
                setApplicantsSelected(recruiter?.selected || 0);
                setApplicantsRejected(recruiter?.rejected || 0);
                setApplicants(recruiter?.applicants || 0);
                setUsername(recruiter?.username || '');
                if (recruiter?.profile)
                    setProfile(`data:image/jpeg;base64,${bufferToBase64(recruiter?.profile?.data)}`);

            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchRecruiter();
    }, [axios]);

    return (
        <>
            <div className='d-flex flex-column ml-3'>

                <div id="idnel" className="container my-5 px-0 mx-0 ">
                    <div id="imcik" className="d-flex flex-row justify-content-center p-3 welcome">
                        <div id="ic4sg" className='pe-3'>
                            {profile ?
                                <img className='profile' src={profile} height={'125'} alt='' />
                                : <svg xmlns="http://www.w3.org/2000/svg" width="155" height="155" fill="#0f172a" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            }
                        </div>
                        <div id="iors5" className="col-12 col-sm-12 col-lg-6 col-xl-6 col-md-8">
                            <h2 id="i7b8a">Welcome back, </h2>
                            <h2 id="ix853" data-session="student.name" style={{ display: "block" }}>{username}</h2>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center align-items-center m-3'>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Jobs posted</h3>
                            <h3 className="mb-2" style={{ color: '#3b82f6' }}>{posted}</h3>
                        </div>
                    </div>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Applicants rejected</h3>
                            <h3 className="mb-2" style={{ color: '#ef4444' }}>{applicantsRejected}</h3>
                        </div>
                    </div>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Applicants selected</h3>
                            <h3 className="mb-2" style={{ color: '#ffc107' }}>{applicantsSelected}</h3>
                        </div>
                    </div>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Applicants</h3>
                            <h3 className="mb-2" style={{ color: '#28a745' }}>{applicants}</h3>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default RecruiterDashboard;