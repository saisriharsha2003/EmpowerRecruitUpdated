import React, { useState, useEffect } from 'react';
import { notify } from '../toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

const CollegeDrives = () => {
    const [pastDrives, setPastDrives] = useState([]);
    const [upcomingDrives, setUpcomingDrives] = useState([]);

    const axios = useAxiosPrivate();

    const fetchDrives = async () => {
        try {
            const response = await axios.get('/college/drives');

            const drives = response?.data
            setPastDrives(drives?.approved);
            setUpcomingDrives(drives?.pending);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const response = await axios.get('/college/drives');

                const drives = response?.data
                setPastDrives(drives?.approved);
                setUpcomingDrives(drives?.pending);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchDrives();
    }, [axios]);

    const handleApproval = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/college/job/' + e.target.id);

            const success = response?.data?.success;
            if (success)
                notify('success', success);

            fetchDrives();
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }


    return (
        <>

            <div className='d-flex flex-column justify-content-center mx-5 my-2'>

                <div>
                    <div>
                        <h1>Past drives</h1>
                    </div>

                    {pastDrives.map((drive, index) => (
                        <div key={index} className="card my-2 px-4 py-2" style={{ width: '53rem' }}>
                            <div className='card-body p-2'>
                                <h5 className="card-title">{drive.jobRole}</h5>
                            </div>
                            <div className='card-body p-2'>
                                <h6 className="card-subtitle mb-2 text-muted">{drive.companyName}</h6>
                            </div>
                            <div className='card-body p-2 tect-wrap' style={{ width: '50rem' }}>
                                <p className="card-text">{drive.description}</p>
                            </div>
                            <div className='card-body p-2'>
                                <Link className="btn btn-primary" to={drive._id} role="button">view</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div>
                        <h1>Upcoming drives</h1>
                    </div>

                    {upcomingDrives.map((drive, index) => (
                        <div key={index} className="card my-2 px-4 py-2" style={{ width: '53rem' }}>
                            <div className='card-body p-2'>
                                <h5 className="card-title">{drive.jobRole}</h5>
                            </div>
                            <div className='card-body p-2'>
                                <h6 className="card-subtitle mb-2 text-muted">{drive.companyName}</h6>
                            </div>
                            <div className='card-body p-2 tect-wrap' style={{ width: '50rem' }}>
                                <p className="card-text">{drive.description}</p>
                            </div>
                            <div className='card-body p-2' style={{ width: '10rem' }}>
                                <div className='d-flex justify-content-between'>
                                    <Link className="btn btn-primary" to={drive._id} role="button">view</Link>
                                    <button id={drive._id} className="btn btn-dark" onClick={handleApproval}>Approve</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}

export default CollegeDrives