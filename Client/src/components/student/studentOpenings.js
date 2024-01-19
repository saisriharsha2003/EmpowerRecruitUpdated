import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { Link } from 'react-router-dom';

const StudentOpenings = () => {
    const [jobs, setJobs] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const response = await axios.get('/student/jobs');

                const jobs = response?.data
                setJobs(jobs);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchOpenings();
    }, [axios]);

    return (
        <>

            <div className='d-flex flex-column justify-content-center mx-5 my-2'>
                <div>
                    <h1>Jobs</h1>
                </div>

                {jobs.map((job, index) => (
                    <div key={index} className="card my-2 px-4 py-2" style={{ width: '53rem' }}>
                        <div className='card-body p-2'>
                            <h5 className="card-title">{job.jobRole}</h5>
                        </div>
                        <div className='card-body p-2'>
                            <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
                        </div>
                        <div className='card-body p-2 tect-wrap' style={{ width: '50rem' }}>
                            <p className="card-text">{job.description}</p>
                        </div>
                        <div className='card-body p-2'>
                            <Link className="btn btn-primary" to={job._id} role="button">view</Link>
                        </div>
                    </div>
                ))}

            </div>

        </>
    )

}

export default StudentOpenings;