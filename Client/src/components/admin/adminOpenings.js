import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const AdminOpenings = () => {
    const [openings, setOpenings] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const response = await axios.get('/admin/openings');

                const openings = response?.data
                setOpenings(openings);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchOpenings();
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
                            </tr>
                        </thead>

                        <tbody>

                            {openings.map((job, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{job.companyName}</td>
                                    <td>{job.jobRole}</td>
                                    <td>{job.cgpa}</td>
                                    <td>{job.package}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )
}

export default AdminOpenings;