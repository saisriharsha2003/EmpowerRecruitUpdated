import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const AdminRecruiters = () => {
    const [recruiters, setRecruiters] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axios.get('/admin/recruiters');

                const recruiters = response?.data
                setRecruiters(recruiters);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchRecruiters();
    }, [axios]);

    return (
        <>

            <div className="card m-2 mx-5">
                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Recruiter id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Recruiter name</th>
                                <th scope="col">Company</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recruiters.map((recuriter, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{recuriter?.username}</td>
                                    <td>{recuriter?.recruiterDetail?.fullName}</td>
                                    <td>{recuriter?.company?.name}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )

}

export default AdminRecruiters