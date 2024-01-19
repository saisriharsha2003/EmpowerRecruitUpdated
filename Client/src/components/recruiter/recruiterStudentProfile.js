import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { useParams } from 'react-router-dom';

const RESUMES_URL = 'http://localhost:3500/resumes';

const RecruiterStudentProfile = () => {
    const currentDefault = {
        college: '',
        course: '',
        joinDate: '',
        graduatingYear: '',
        city: '',
        state: '',
        studyYear: '',
        major: '',
        skills: [],
        interests: [],
        cgpa: ''
    };
    const previousDefault = {
        college: '',
        state: '',
        city: '',
        major: '',
        percentage: ''
    };
    const contactDefault = {
        email: '',
        mobile: '',
        currentAddress: '',
        permanentAddress: ''
    };
    const personalDefault = {
        fullName: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        gender: ''
    };

    const { id } = useParams();
    const [jobs, setJobs] = useState([]);
    const [resume, setResume] = useState('');
    const [currentEducation, setCurrentEducation] = useState(currentDefault);
    const [previousEducation, setPreviousEducation] = useState(previousDefault);
    const [contact, setContact] = useState(contactDefault);
    const [personal, setPersonal] = useState(personalDefault);
    const [certifications, setCertifications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [works, setWorks] = useState([]);

    const axios = useAxiosPrivate();

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/recruiter/studentProfile/' + id);

            const jobs = response?.data?.jobs.map((job) => ({ ...job.jobId, applicationId: job._id }));
            setJobs(jobs);
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get('/recruiter/studentProfile/' + id);

                const jobs = response?.data?.jobs.map((job) => ({ ...job.jobId, applicationId: job._id }));
                setJobs(jobs);

                const student = response?.data?.student;
                setCurrentEducation({
                    ...student?.academic?.currentEducation,
                    interests: student?.academic?.currentEducation?.interests.join(),
                    skills: student?.academic?.currentEducation?.skills.join(),
                    academicId: student?.academic?._id
                });
                setPreviousEducation(student?.academic?.previousEducation);
                setContact(student?.contact);
                setPersonal(student?.personal);
                setCertifications(student?.certifications);
                setProjects(student?.projects);
                setWorks(student?.workExperiences);
                setResume(student?.resume);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchStudentProfile();
    }, [axios, id]);

    const handleSelect = async (e) => {
        try {
            const response = await axios.post('/recruiter/application', {
                applicationId: jobs[parseInt(e.target.id)].applicationId,
                status: 'selected'
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            fetchJobs();
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleReject = async (e) => {
        try {
            const response = await axios.post('/recruiter/application', {
                applicationId: jobs[parseInt(e.target.id)].applicationId,
                status: 'rejected'
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            fetchJobs();
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    return (
        <>

            <div className='d-flex justify-content-center align-items-center '>

                <div>

                    <div className="card m-2 p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fff' }}>

                        <h5 className="card-title">Student</h5>
                        <a href={`${RESUMES_URL}/${resume}`} className='link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>{resume?.slice(13,)}</a>

                        {/* Academic */}
                        <div className='card-body'>
                            <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                <h5 className="card-title">Academic</h5>

                                <div className='d-inline-flex'>
                                    <div className='card-body'>
                                        <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                            <h5 className="card-title">Current education</h5>

                                            <div className='d-inline-flex '>

                                                <div>
                                                    <div className='card-body'>
                                                        <b>College</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Course</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Join date</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Graduating year</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>City</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>State</b>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='card-body'>
                                                        {currentEducation?.college}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.course}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.joinDate}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.graduatingYear}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.city}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.state}
                                                    </div>
                                                </div>

                                                <div className="vr"></div>

                                                <div>
                                                    <div className='card-body'>
                                                        <b>Study year</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Major</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Skills</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Interests</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>CGPA</b>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='card-body'>
                                                        {currentEducation?.studyYear}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.major}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.skills}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.interests}
                                                    </div>

                                                    <div className='card-body'>
                                                        {currentEducation?.cgpa}
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className='card-body'>
                                        <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                            <h5 className="card-title">Previous education</h5>

                                            <div className='d-inline-flex '>

                                                <div>
                                                    <div className='card-body'>
                                                        <b>College</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>State</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>City</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Major</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Percentage</b>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className='card-body'>
                                                        {previousEducation?.college}
                                                    </div>

                                                    <div className='card-body'>
                                                        {previousEducation?.state}
                                                    </div>

                                                    <div className='card-body'>
                                                        {previousEducation?.city}
                                                    </div>

                                                    <div className='card-body'>
                                                        {previousEducation?.major}
                                                    </div>

                                                    <div className='card-body'>
                                                        {previousEducation?.percentage}
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='d-flex'>
                            {/* Personal */}
                            <div className='card-body d-flex'>
                                <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                    <h5 className="card-title">Personal</h5>

                                    <div className='d-inline-flex '>

                                        <div>
                                            <div className='card-body'>
                                                <b>Full name</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>Father name</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>Mother name</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>Date of birth</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>gender</b>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='card-body'>
                                                {personal?.fullName}
                                            </div>

                                            <div className='card-body'>
                                                {personal?.fatherName}
                                            </div>

                                            <div className='card-body'>
                                                {personal?.motherName}
                                            </div>

                                            <div className='card-body'>
                                                {personal?.dateOfBirth}
                                            </div>

                                            <div className='card-body'>
                                                {personal?.gender}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Contact */}
                            <div className='card-body d-flex'>
                                <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                    <h5 className="card-title">Contact</h5>

                                    <div className='d-inline-flex '>

                                        <div>
                                            <div className='card-body'>
                                                <b>Email</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>Mobile</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>Current address</b>
                                            </div>

                                            <div className='card-body'>
                                                <b>Permanent address</b>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='card-body'>
                                                {contact?.email}
                                            </div>

                                            <div className='card-body'>
                                                {contact?.mobile}
                                            </div>

                                            <div className='card-body'>
                                                {contact?.currentAddress}
                                            </div>

                                            <div className='card-body'>
                                                {contact?.permanentAddress}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className='d-flex'>

                            <div>
                                {/* Certifications */}
                                {certifications.map((certification, index) => (
                                    <div key={index} className='card-body'>
                                        <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                            <h5 className="card-title">Certification {index + 1}</h5>

                                            <div className='d-inline-flex '>

                                                <div>
                                                    <div className='card-body'>
                                                        <b>Name</b>
                                                    </div>

                                                    <div className='card-body'>
                                                        <b>Organization</b>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className='card-body'>
                                                        {certification?.name}
                                                    </div>

                                                    <div className='card-body'>
                                                        {certification?.organization}
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div>
                                {/* Projects */}
                                {projects.map((project, index) => (
                                    <div key={index} className='card-body'>
                                        <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                            <h5 className="card-title">Project {index + 1}</h5>

                                            <div className='d-inline-flex '>

                                                <div>
                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Name </b>
                                                        {project?.name}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Start date </b>
                                                        {project?.startDate}
                                                    </div>

                                                    {
                                                        !project?.currentlyWorking &&
                                                        <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                            <b>End date </b>
                                                            {project?.endDate}
                                                        </div>
                                                    }

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Currently working </b>
                                                        {project?.currentlyWorking.toString()}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Description </b>
                                                        {project?.description}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Associated </b>
                                                        {project?.associated}
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                {/* Works */}
                                {works.map((work, index) => (
                                    <div key={index} className='card-body'>
                                        <div className="card m-2 p-3" style={{ backgroundColor: '#fff' }}>

                                            <h5 className="card-title">Work Experience {index + 1}</h5>

                                            <div className='d-inline-flex '>

                                                <div>
                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Organization </b>
                                                        {work?.organization}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Role </b>
                                                        {work?.role}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Description </b>
                                                        {work?.description}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>Start date </b>
                                                        {work?.startDate}
                                                    </div>

                                                    <div className='card-body text-wrap' style={{ width: '15rem' }}>
                                                        <b>End date </b>
                                                        {work?.endDate}
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='d-flex justify-content-center align-items-center flex-wrap mx-5'>

                {jobs.map((job, index) => (
                    <div key={index}>

                        <div>
                            <section className="card mx-5 p-3 my-3" style={{ width: '30rem' }}>

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
                                            <div style={{ width: '12rem' }}>
                                                <h5>Company name</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.companyName}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="my-2">
                                    <div className="container">
                                        <div className="row">
                                            <div style={{ width: '12rem' }}>
                                                <h5>Job role</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.jobRole}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="my-2">
                                    <div className="container">
                                        <div className="row">
                                            <div style={{ width: '12rem' }}>
                                                <h5>CGPA</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.cgpa}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="my-2">
                                    <div className="container">
                                        <div className="row">
                                            <div style={{ width: '12rem' }}>
                                                <h5>Description</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="my-2">
                                    <div className="container">
                                        <div className="row">
                                            <div style={{ width: '12rem' }}>
                                                <h5>Experience</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.experience}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="my-2">
                                    <div className="container">
                                        <div className="row">
                                            <div style={{ width: '12rem' }}>
                                                <h5>Seats</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.seats}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="my-2">
                                    <div className="container">
                                        <div className="row">
                                            <div style={{ width: '12rem' }}>
                                                <h5>Package</h5>
                                            </div>
                                            <div style={{ width: '15rem' }}>
                                                <div className="card-title">{job.package}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className='d-inline-flex'>
                                    <div className='card-body'>
                                        <button id={index} onClick={handleSelect} className='btn btn-primary'>Select</button>
                                    </div>
                                    <div className='card-body'>
                                        <button id={index} onClick={handleReject} className='btn btn-dark'>Reject</button>
                                    </div>
                                </div>

                            </section >
                        </div>

                    </div>
                ))}

            </div>

        </>
    )

}

export default RecruiterStudentProfile;