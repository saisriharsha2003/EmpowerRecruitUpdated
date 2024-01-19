import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { useNavigate, useParams } from 'react-router-dom';

const RecruiterJobProfile = () => {
    const jobDefault = {
        companyName: '',
        jobRole: '',
        cgpa: '',
        description: '',
        experience: '',
        seats: '',
        package: ''
    };
    const companyDefault = {
        name: '',
        industry: '',
        size: '',
        website: '',
        address: '',
        mobile: '',
        overview: ''
    };

    const { id } = useParams();
    const [job, setJob] = useState(jobDefault);
    const [company, setCompany] = useState(companyDefault);
    const navigate = useNavigate();

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchJobProfile = async () => {
            try {
                const response = await axios.get('/recruiter/jobProfile/' + id);

                const profile = response?.data;
                setJob(profile?.job);
                setCompany(profile?.company);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchJobProfile();
    }, [axios, id]);

    const handleDeleteJob = async (e) => {
        try {
            const response = await axios.delete('/recruiter/job/' + id);
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            navigate(-1)
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            <div className='d-flex justify-content-center align-items-center my-5'>

                <section className="card mx-5 p-3" style={{ width: '38rem' }}>

                    <section className="mb-3">
                        <div className="container">
                            <div className="row">
                                <div>
                                    <h1>Job profile</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Company name</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.companyName}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Job role</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.jobRole}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>CGPA</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.cgpa}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Description</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.description}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Experience</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.experience}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Seats</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.seats}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <h5>Package</h5>
                                </div>
                                <div style={{ width: '20rem' }}>
                                    <div className="card-title">{job.package}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '15rem' }}>
                                    <button onClick={handleDeleteJob} className='btn btn-dark'>Delete</button>
                                </div>
                            </div>
                        </div>
                    </section>

                </section >

                <section className="card mx-5 p-3" style={{ width: '30rem' }}>

                    <section className="mb-3">
                        <div className="container">
                            <div className="row">
                                <div>
                                    <h1>Company profile</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Name</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.name}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Industry</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.industry}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Size</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.size}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Website</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.website}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Address</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.address}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Mobile</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.mobile}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="my-2">
                        <div className="container">
                            <div className="row">
                                <div style={{ width: '10rem' }}>
                                    <h5>Overview</h5>
                                </div>
                                <div style={{ width: '15rem' }}>
                                    <div className="card-title">{company.overview}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                </section >

            </div>

        </>
    )

}

export default RecruiterJobProfile;