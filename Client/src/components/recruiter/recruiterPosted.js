import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';
import { Link } from 'react-router-dom';

const RecruiterPosted = () => {
    const [posted, setPosted] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchPosted = async () => {
            try {
                const response = await axios.get('/recruiter/jobs');

                const posted = response?.data
                setPosted(posted);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchPosted();
    }, [axios]);

    return (
        <>

            <div className="card m-2 mx-5">
                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Job id</th>
                                <th scope="col">Company name</th>
                                <th scope="col">Job role</th>
                                <th scope="col">CGPA</th>
                                <th scope="col">salary</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {posted.map((job, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{job.companyName}</td>
                                    <td>{job.jobRole}</td>
                                    <td>{job.cgpa}</td>
                                    <td>{job.package}</td>
                                    <td><Link className="btn btn-primary" to={job._id} role="button">view</Link></td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )

}

export default RecruiterPosted;