import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { Link } from 'react-router-dom';

const StudentOpenings = () => {
    const [jobs, setJobs] = useState([]);
    const [aboutStu, setaboutStu] = useState('');
    const [aboutJob, setaboutJob] = useState('');
    const [scores, setScores] = useState({})
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
        // fetchStudent();
    }, [axios]);

    const fetchStudent = async () => {
        try {
            const response = await axios.get('/student/details');
            const student = response?.data;
            let studentProfile = "skills:\n";
            studentProfile += student?.academic?.currentEducation?.skills.join(",") + "\n";
            studentProfile += "certifications:\n";
            // Concatenate certifications
            if (student?.certifications && student?.certifications.length > 0) {
                for(let i = 0; i < student?.certifications.length; i++)
                {
                    let temp = student?.certifications[i].name + " " + student?.certifications[i].organization+",";
                    studentProfile += temp
                }
            }
            // console.log(studentProfile);
            
            return studentProfile
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const computeCapability = async (jobId, sentence2) => {
        try {
            const sentence1 = await fetchStudent();
            // setaboutStu(sent1);
            console.log(sentence1)
            console.log(sentence2)
            const requestBody = {
                sent1: sentence1,
                sent2: sentence2
            };
    
            const response = await axios.post('/student/capabilityCal', requestBody)
            const score = response?.data?.score?.similarity_matrix;
            setScores(prevScores => ({ ...prevScores, [jobId]: score }));
            
            notify('success', "done")
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
        

    }

    const getProgressWidth = (score) => {
        if (score >= 97) return '100%';
        return `${(score / 97) * 100}%`;
      };

    const getProgressBarColor = (score) => {
        if (score >= 70) return 'bg-success';
        if (score >= 50) return '';
        if (score >= 30) return 'bg-warning';
        return 'bg-danger';
      };

    return (
        <>

            <div className='d-flex flex-column justify-content-center mx-5 my-2 mb-5'>
                <div>
                    <h1 className='mb-4 pb-1 pb-md-0 mb-md-3'>Jobs</h1>
                </div>
                
                    {jobs.map((job, index) => (
                        <div className="card container h-100 shadow-2-strong mt-5 p-4 shadow-sm" style={{ backgroundColor: '#fff' }}>
                        {/* <div className='card-body'> */}
                        <div key={index} className="card-body my-2 px-4 py-2">
                            <div className='d-flex justify-content-between'>
                                <h5 className="card-title mb-3 mb-4 pb-1 pb-md-0 mb-md-3">{job.jobRole}</h5>
                                <h5 className="card-subtitle text-muted">{job.companyName}</h5>
                            </div>
                            <div className='card-body p-2 text-wrap'>
                                <p className="card-text">{job.description}</p>
                            </div>
                            <div className='card-body p-2 mt-2'>
                                <Link className="btn btn-primary" to={job._id} role="button">view</Link>
                                <Link className="btn btn-dark mx-4" onClick={() => computeCapability(job._id, job.description)} role="button">Match My Capability</Link>
                                {/* {scores[job._id] ? <span>{scores[job._id]}</span> : null} */}
                                {scores[job._id] && (
                                <div className="progress mt-4">
                                    <div className={`progress-bar ${getProgressBarColor(scores[job._id])}`} role="progressbar" style={{ width: getProgressWidth(scores[job._id]) }} aria-valuenow={scores[job._id]} aria-valuemin="0" aria-valuemax="95">{scores[job._id]}%</div>
                                </div>
                                )}
                            </div>
                        </div>
                        {/* </div> */}
                        </div>
                    ))}
                

                

            </div>

        </>
    )

}

export default StudentOpenings;