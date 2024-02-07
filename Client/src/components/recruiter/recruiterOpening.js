import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const RecruiterOpening = () => {
    const jobDefault = {
        jobRole: '',
        cgpa: '',
        description: '',
        experience: '',
        seats: '',
        package: '',
        applicationFor: '',
    }

    const axios = useAxiosPrivate();
    const [job, setJob] = useState(jobDefault);
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get('/recruiter/colleges');

                const colleges = response?.data;
                setColleges(colleges);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchColleges();
    }, [axios]);

    const handleJob = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/recruiter/job/new', {
                ...job,
                cgpa: parseInt(job.cgpa) || job.cgpa,
                seats: parseInt(job.seats) || job.seats
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setJob(jobDefault);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            {/* Job Detail */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <h2>Job</h2>

                            <div className='d-flex flex-row'>

                                <div>
                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='jj'
                                                className="form-control"
                                                type="text"
                                                placeholder='Job role'
                                                autoComplete='off'
                                                value={job.jobRole}
                                                onChange={(e) => setJob(prev => ({ ...prev, jobRole: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jj'>Job role</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='jg'
                                                className="form-control"
                                                type="text"
                                                placeholder='cgpa'
                                                minLength={10}
                                                maxLength={10}
                                                autoComplete='off'
                                                value={job.cgpa}
                                                onChange={(e) => setJob(prev => ({ ...prev, cgpa: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jg'>cgpa</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <textarea
                                                id='jd'
                                                className="form-control"
                                                type="text"
                                                placeholder='Description'
                                                autoComplete='off'
                                                value={job.description}
                                                onChange={(e) => setJob(prev => ({ ...prev, description: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jd'>Description</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="form-floating flex-nowrap">
                                            <select id='application' required className="form-select" value={job.applicationFor} onChange={(e) => setJob(prev => ({ ...prev, applicationFor: e.target.value }))}>
                                                <option defaultValue=''></option>
                                                <option value='Everyone'>Everyone</option>
                                                {colleges.map((college, index) => (
                                                    <option key={index} value={college}>{college}</option>
                                                ))}
                                            </select>
                                            <label htmlFor='application'>Application for</label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='je'
                                                className="form-control"
                                                type="text"
                                                placeholder='Experience'
                                                autoComplete='off'
                                                value={job.experience}
                                                onChange={(e) => setJob(prev => ({ ...prev, experience: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='je'>Experience</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='js'
                                                className="form-control"
                                                type="text"
                                                placeholder='Seats'
                                                autoComplete='off'
                                                value={job.seats}
                                                onChange={(e) => setJob(prev => ({ ...prev, seats: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='js'>Seats</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='jp'
                                                className="form-control"
                                                type="text"
                                                placeholder='Package'
                                                autoComplete='off'
                                                value={job.package}
                                                onChange={(e) => setJob(prev => ({ ...prev, package: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='jp'>Package</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="card-body">
                                <button className="btn btn-primary" onClick={handleJob}>submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RecruiterOpening