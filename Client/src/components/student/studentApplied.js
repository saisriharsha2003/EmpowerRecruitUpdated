import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const StudentApplied = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchApplied = async () => {
            try {
                const response = await axios.get('/student/applied');

                const appliedJobs = response?.data
                setAppliedJobs(appliedJobs);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchApplied();
    }, [axios]);

    return (
        <>

            <div className="card m-2 mx-5" >
                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Job id</th>
                                <th scope="col">Company name</th>
                                <th scope="col">Job role</th>
                                <th scope="col">salary</th>
                                <th scope="col">Applied on</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {appliedJobs.map((job, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{job.companyName}</td>
                                    <td>{job.jobRole}</td>
                                    <td>{job.salary}</td>
                                    <td>{new Date(job.appliedOn).toString().slice(4, 21)}</td>
                                    <td>{job.status}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )

}

export default StudentApplied;