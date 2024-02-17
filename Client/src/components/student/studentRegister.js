import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { Link } from 'react-router-dom';

const StudentRegister = () => {
    const disabledDefault = {
        academic: false,
        certification: false,
        contact: false,
        personal: false,
        project: false,
        work: false,
    }
    const currentDefault = {
        college: '',
        course: '',
        joinDate: '',
        graduatingYear: '',
        city: '',
        state: '',
        rollNo: '',
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
    const certificationDefault = {
        name: '',
        organization: ''
    };
    const contactDefault = {
        email: '',
        collegeEmail: '',
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
    const projectDefault = {
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        associated: ''
    };
    const workDefault = {
        organization: '',
        role: '',
        description: '',
        startDate: '',
        endDate: ''
    };
    const [current, setCurrent] = useState(false);
    const [disabled, setDisabled] = useState(disabledDefault);

    const axios = useAxiosPrivate();
    const [currentEducation, setCurrentEducation] = useState(currentDefault);
    const [previousEducation, setPreviousEducation] = useState(previousDefault);
    const [certification, setCertification] = useState(certificationDefault);
    const [contact, setContact] = useState(contactDefault);
    const [personal, setPersonal] = useState(personalDefault);
    const [project, setProject] = useState(projectDefault);
    const [work, setWork] = useState(workDefault);

    const handleAcademic = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/academic', {
                currentEducation: {
                    ...currentEducation,
                    graduatingYear: parseInt(currentEducation.graduatingYear),
                    studyYear: parseInt(currentEducation.studyYear),
                    cgpa: parseInt(currentEducation.cgpa)
                },
                previousEducation: {
                    ...previousEducation,
                    percentage: parseInt(previousEducation.percentage)
                },
                rollNo: currentEducation.rollNo
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setCurrentEducation(currentDefault);
            setPreviousEducation(previousDefault);
            setDisabled(prev => ({ ...prev, academic: true }));
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleCertification = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/certification', {
                ...certification
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setCertification(certificationDefault);
            setDisabled(prev => ({ ...prev, certification: true }));
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleContact = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/contact', {
                ...contact,
                mobile: parseInt(contact.mobile) || contact.mobile
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setContact(contactDefault);
            setDisabled(prev => ({ ...prev, contact: true }));
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handlePersonal = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/personal', {
                ...personal
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setPersonal(personalDefault);
            setDisabled(prev => ({ ...prev, personal: true }));
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleProject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/project', {
                ...project
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setProject(projectDefault);
            setDisabled(prev => ({ ...prev, project: true }));
        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleWork = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/work', {
                ...work
            });
            const success = response?.data?.success;
            if (success)
                notify('success', success);

            setWork(workDefault);
            setDisabled(prev => ({ ...prev, work: true }));
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

            const response = await axios.post('/student/profile', fd,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

            const success = response?.data?.success;
            if (success)
                notify('success', success);

        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const handleResume = async (e) => {
        e.preventDefault();
        try {
            const resume = document.getElementById("resume");
            const fd = new FormData();
            fd.append('resume', resume.files[0]);
            if (!fd) return

            const response = await axios.post('/student/resume', fd,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

            const success = response?.data?.success;
            if (success)
                notify('success', success);

        } catch (err) {
            notify('failed', err?.response?.data?.message);
        }
    }

    const addCertification = (e) => {
        e.preventDefault();
        setDisabled(prev => ({ ...prev, certification: false }));
    }

    const addProject = (e) => {
        e.preventDefault();
        setDisabled(prev => ({ ...prev, project: false }));
    }

    const addWork = (e) => {
        e.preventDefault();
        setDisabled(prev => ({ ...prev, work: false }));
    }

    return (
        <>
            <div className='d-flex justify-content-center mt-3'>
                <h3>Provide all details</h3>
            </div>

            {/* Personal */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <fieldset disabled={disabled.personal}>

                                <h2>Personal</h2>

                                <div className='d-flex flex-row'>
                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='pef'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Full name'
                                                    autoComplete='off'
                                                    value={personal.fullName}
                                                    onChange={(e) => setPersonal(prev => ({ ...prev, fullName: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='pef'>Full name</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='pefa'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Father name'
                                                    autoComplete='off'
                                                    value={personal.fatherName}
                                                    onChange={(e) => setPersonal(prev => ({ ...prev, fatherName: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='pefa'>Father name</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='pem'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Mother name'
                                                    autoComplete='off'
                                                    value={personal.motherName}
                                                    onChange={(e) => setPersonal(prev => ({ ...prev, motherName: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='pem'>Mother name</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='ped'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Date of birth'
                                                    autoComplete='off'
                                                    value={personal.dateOfBirth}
                                                    onChange={(e) => setPersonal(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='ped'>Date of birth</label>
                                                <p class="card-subtitle text-body-secondary">&nbsp;DD/MM/YYYY</p>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <select required id='peg' className="form-select" value={personal.gender} onChange={(e) => setPersonal(prev => ({ ...prev, gender: e.target.value }))}>
                                                    <option defaultValue=''></option>
                                                    <option value='male'>Male</option>
                                                    <option value='female'>Female</option>
                                                </select>
                                                <label htmlFor='peg'>Gender</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-body">
                                    <button className="btn btn-primary" onClick={handlePersonal}>submit</button>
                                </div>

                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <fieldset disabled={disabled.contact}>

                                <h2>Contact</h2>

                                <div className='d-flex flex-row'>
                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='cone'
                                                    className="form-control"
                                                    type="email"
                                                    placeholder='Email'
                                                    autoComplete='off'
                                                    value={contact.email}
                                                    onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='cone'>Email</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='conce'
                                                    className="form-control"
                                                    type="email"
                                                    placeholder='College email'
                                                    autoComplete='off'
                                                    value={contact.collegeEmail}
                                                    onChange={(e) => setContact(prev => ({ ...prev, collegeEmail: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='conce'>College email</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <textarea
                                                    id='conec'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Current address'
                                                    autoComplete='off'
                                                    value={contact.currentAddress}
                                                    onChange={(e) => setContact(prev => ({ ...prev, currentAddress: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='conec'>Current address</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='conm'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Mobile'
                                                    minLength={10}
                                                    maxLength={10}
                                                    autoComplete='off'
                                                    value={contact.mobile}
                                                    onChange={(e) => setContact(prev => ({ ...prev, mobile: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='conm'>Mobile</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <textarea
                                                    id='conp'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Permanent address'
                                                    autoComplete='off'
                                                    value={contact.permanentAddress}
                                                    onChange={(e) => setContact(prev => ({ ...prev, permanentAddress: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='conp'>Permanent address</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-body">
                                    <button className="btn btn-primary" onClick={handleContact}>submit</button>
                                </div>

                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>

            {/* Academic */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <fieldset disabled={disabled.academic}>

                                <h2>Academic</h2>

                                <div className="card m-2" style={{ backgroundColor: '#fff' }}>

                                    <div className="card-body">
                                        <h2>Current education</h2>
                                    </div>

                                    <div className='d-flex flex-row'>

                                        <div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cc'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='College name'
                                                        autoComplete='off'
                                                        value={currentEducation.college}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, college: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cc'>College name</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='co'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Course'
                                                        autoComplete='off'
                                                        value={currentEducation.course}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, course: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='co'>Course</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cj'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Join Date'
                                                        autoComplete='off'
                                                        value={currentEducation.joinDate}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, joinDate: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cj'>Join Date</label>
                                                    <p class="card-subtitle text-body-secondary">&nbsp;DD/MM/YYYY</p>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cg'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Graduating Year'
                                                        autoComplete='off'
                                                        value={currentEducation.graduatingYear}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, graduatingYear: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cg'>Graduating year</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='ci'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='City'
                                                        autoComplete='off'
                                                        value={currentEducation.city}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, city: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='ci'>City</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cs'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='State'
                                                        autoComplete='off'
                                                        value={currentEducation.state}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, state: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cs'>State</label>
                                                </div>
                                            </div>

                                        </div>

                                        <div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='ct'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Study Year'
                                                        autoComplete='off'
                                                        value={currentEducation.studyYear}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, studyYear: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='ct'>Study year</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cm'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Major'
                                                        autoComplete='off'
                                                        value={currentEducation.major}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, major: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cm'>Major</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cr'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Roll No.'
                                                        autoComplete='off'
                                                        value={currentEducation.rollNo}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, rollNo: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cr'>Roll No.</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='ck'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Skills'
                                                        autoComplete='off'
                                                        value={currentEducation.skills}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, skills: e.target.value.split(',') }))}
                                                        required
                                                    />
                                                    <label htmlFor='ck'>Skills</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cn'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Interests'
                                                        autoComplete='off'
                                                        value={currentEducation.interests}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, interests: e.target.value.split(',') }))}
                                                        required
                                                    />
                                                    <label htmlFor='cn'>Interests</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='cp'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='cgpa'
                                                        autoComplete='off'
                                                        value={currentEducation.cgpa}
                                                        onChange={(e) => setCurrentEducation(prev => ({ ...prev, cgpa: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='cp'>cgpa</label>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="card m-2" style={{ backgroundColor: '#fff' }}>

                                    <div className="card-body">
                                        <h2>Previous education</h2>
                                    </div>

                                    <div className='d-flex flex-row'>

                                        <div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='pc'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='College name'
                                                        autoComplete='off'
                                                        value={previousEducation.college}
                                                        onChange={(e) => setPreviousEducation(prev => ({ ...prev, college: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='pc'>College</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='ps'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='State'
                                                        autoComplete='off'
                                                        value={previousEducation.state}
                                                        onChange={(e) => setPreviousEducation(prev => ({ ...prev, state: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='ps'>State</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='pi'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='City'
                                                        autoComplete='off'
                                                        value={previousEducation.city}
                                                        onChange={(e) => setPreviousEducation(prev => ({ ...prev, city: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='pi'>City</label>
                                                </div>
                                            </div>

                                        </div>

                                        <div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='pm'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Major'
                                                        autoComplete='off'
                                                        value={previousEducation.major}
                                                        onChange={(e) => setPreviousEducation(prev => ({ ...prev, major: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='pm'>Major</label>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="flex-nowrap form-floating">
                                                    <input
                                                        id='pp'
                                                        className="form-control"
                                                        type="text"
                                                        placeholder='Percentage'
                                                        autoComplete='off'
                                                        value={previousEducation.percentage}
                                                        onChange={(e) => setPreviousEducation(prev => ({ ...prev, percentage: e.target.value }))}
                                                        required
                                                    />
                                                    <label htmlFor='pp'>Percentage</label>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="card-body">
                                    <button className="btn btn-primary" onClick={handleAcademic}>submit</button>
                                </div>

                            </fieldset>

                        </form>
                    </div>
                </div >
            </div >

            {/* Certification */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <fieldset disabled={disabled.certification}>

                                <h2>Certification</h2>

                                <div className='d-flex flex-row'>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='cen'
                                                className="form-control"
                                                type="text"
                                                placeholder='Name'
                                                autoComplete='off'
                                                value={certification.name}
                                                onChange={(e) => setCertification(prev => ({ ...prev, name: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='cen'>Name</label>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="flex-nowrap form-floating">
                                            <input
                                                id='ceo'
                                                className="form-control"
                                                type="text"
                                                placeholder='Organization'
                                                autoComplete='off'
                                                value={certification.organization}
                                                onChange={(e) => setCertification(prev => ({ ...prev, organization: e.target.value }))}
                                                required
                                            />
                                            <label htmlFor='ceo'>Organization</label>
                                        </div>
                                    </div>

                                </div>

                            </fieldset>

                            <div className='d-flex flex-row'>

                                <div className="card-body">
                                    <button disabled={disabled.certification} className="btn btn-primary" onClick={handleCertification}>submit</button>
                                </div>

                                <div className="card-body">
                                    <button className="btn btn-dark" onClick={addCertification}>add another</button>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {/* Project */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <fieldset disabled={disabled.project}>

                                <h2>Project</h2>

                                <div className='d-flex flex-row'>
                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='prn'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Name'
                                                    autoComplete='off'
                                                    value={project.name}
                                                    onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='prn'>Name</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='prs'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Start date'
                                                    autoComplete='off'
                                                    value={project.startDate}
                                                    onChange={(e) => setProject(prev => ({ ...prev, startDate: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='prs'>Start date</label>
                                                <p class="card-subtitle text-body-secondary">&nbsp;DD/MM/YYYY</p>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='pra'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Associated'
                                                    autoComplete='off'
                                                    value={project.associated}
                                                    onChange={(e) => setProject(prev => ({ ...prev, associated: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='pra'>Associated</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <textarea
                                                    id='prd'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Description'
                                                    autoComplete='off'
                                                    value={project.description}
                                                    onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='prd'>Description</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='pre'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='End date'
                                                    autoComplete='off'
                                                    value={project.endDate}
                                                    disabled={current}
                                                    onChange={(e) => setProject(prev => ({ ...prev, endDate: e.target.value }))}
                                                />
                                                <label htmlFor='pre'>End date</label>
                                                <p class="card-subtitle text-body-secondary">&nbsp;DD/MM/YYYY</p>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-check">
                                                <input
                                                    id='prc'
                                                    className='form-check-input'
                                                    type="checkbox"
                                                    value={current}
                                                    onChange={(e) => setCurrent(prev => {
                                                        setProject(prev => ({ ...prev, endDate: '' }))
                                                        return !prev
                                                    })}
                                                />
                                                <label className="form-check-label" htmlFor="prc">Currently working</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </fieldset>

                            <div className='d-flex flex-row'>
                                <div className="card-body">
                                    <button disabled={disabled.project} className="btn btn-primary" onClick={handleProject}>submit</button>
                                </div>

                                <div className="card-body">
                                    <button className="btn btn-dark" onClick={addProject}>add another</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {/* Work */}
            <div className='d-flex justify-content-center m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <fieldset disabled={disabled.work}>

                                <h2>Work</h2>

                                <div className='d-flex flex-row'>
                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='wo'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Organization'
                                                    autoComplete='off'
                                                    value={work.organization}
                                                    onChange={(e) => setWork(prev => ({ ...prev, organization: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='wo'>Organization</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='ws'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Start date'
                                                    autoComplete='off'
                                                    value={work.startDate}
                                                    onChange={(e) => setWork(prev => ({ ...prev, startDate: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='ws'>Start date</label>
                                                <p class="card-subtitle text-body-secondary">&nbsp;DD/MM/YYYY</p>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <textarea
                                                    id='wd'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Description'
                                                    autoComplete='off'
                                                    value={work.description}
                                                    onChange={(e) => setWork(prev => ({ ...prev, description: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='wd'>Description</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='wr'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='Role'
                                                    autoComplete='off'
                                                    value={work.role}
                                                    onChange={(e) => setWork(prev => ({ ...prev, role: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='wr'>Role</label>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="flex-nowrap form-floating">
                                                <input
                                                    id='we'
                                                    className="form-control"
                                                    type="text"
                                                    placeholder='End date'
                                                    autoComplete='off'
                                                    value={work.endDate}
                                                    onChange={(e) => setWork(prev => ({ ...prev, endDate: e.target.value }))}
                                                    required
                                                />
                                                <label htmlFor='we'>End date</label>
                                                <p class="card-subtitle text-body-secondary">&nbsp;DD/MM/YYYY</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </fieldset>

                            <div className='d-flex flex-row'>
                                <div className="card-body">
                                    <button disabled={disabled.work} className="btn btn-primary" onClick={handleWork}>submit</button>
                                </div>

                                <div className="card-body">
                                    <button className="btn btn-dark" onClick={addWork}>add another</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {/* Profile */}
            <div className='d-flex justify-content-center align-items-end m-3'>
                <div className='d-inline-flex p-2'>
                    <div className="card" style={{ backgroundColor: '#fff' }}>
                        <form className="card-body">

                            <h2>Profile</h2>

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

                            <div className="card-body">
                                <div className="flex-nowrap">
                                    <label htmlFor="resume" className="form-label"><b>Resume</b></label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="resume"
                                        name='resume'
                                    />
                                </div>
                                <div className='d-flex flex-row'>
                                    <label className="form-label">File should be lessthan 2 mb and<br /> only pdf's allowed</label>
                                    <button className="btn btn-primary m-2" onClick={handleResume}>upload</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                <div className='d-inline-flex p-2'>
                    <Link className="btn btn-primary" to="/student">Home</Link>
                </div>

            </div>

        </>
    )
}

export default StudentRegister;
