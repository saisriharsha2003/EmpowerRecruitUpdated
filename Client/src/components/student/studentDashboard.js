import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import '../../styles/dash.css';
import { notify } from '../toast';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [jobsApplied, setJobsApplied] = useState();
    const [jobsSelected, setJobsSelected] = useState();
    const [jobsRejected, setJobsRejected] = useState();
    const [openings, setOpenings] = useState();
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
        const fetchStudent = async () => {
            try {
                const response = await axios.get('/student')

                const student = response?.data
                setJobsApplied(student?.jobsApplied || 0);
                setJobsRejected(student?.jobsRejected || 0);
                setJobsSelected(student?.jobsSelected || 0);
                setOpenings(student?.openings || 0);
                setUsername(student?._doc?.username || '');
                if (student?.profile)
                    setProfile(`data:image/jpeg;base64,${bufferToBase64(student?.profile?.data)}`);

            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchStudent();
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
                            <h3 className="card-title">Jobs applied</h3>
                            <h3 className="mb-2" style={{ color: '#3b82f6' }}>{jobsApplied}</h3>
                        </div>
                    </div>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Jobs rejected</h3>
                            <h3 className="mb-2" style={{ color: '#ef4444' }}>{jobsRejected}</h3>
                        </div>
                    </div>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Jobs selected</h3>
                            <h3 className="mb-2" style={{ color: '#ffc107' }}>{jobsSelected}</h3>
                        </div>
                    </div>

                    <div className="card m-2 box1" >
                        <div className="card-body">
                            <h3 className="card-title">Openings</h3>
                            <h3 className="mb-2" style={{ color: '#28a745' }}>{openings}</h3>
                        </div>
                    </div>

                </div>

            </div>


            {/* Demo */}

            <div className="card m-2 mx-5" >

                <div className='card-body'>
                    <h2> Recomended jobs</h2>
                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Job id</th>
                                <th scope="col">Company name</th>
                                <th scope="col">Job role</th>
                                <th scope="col">salary</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <th scope="row">1</th>
                                <td>Atlassian</td>
                                <td>Web developer</td>
                                <td>12 lakhs per anum</td>
                                <td><Link className="btn btn-primary" role="button">Apply</Link></td>
                            </tr>

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )

}

export default StudentDashboard;