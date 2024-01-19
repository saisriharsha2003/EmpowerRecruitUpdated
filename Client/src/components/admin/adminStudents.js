import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const AdminStudents = () => {
    const [students, setStudents] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/admin/students');

                const students = response?.data
                setStudents(students);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchStudents();
    }, [axios]);

    return (
        <>

            <div className="card m-2 mx-5">
                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Student id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Student name</th>
                                <th scope="col">College name</th>
                            </tr>
                        </thead>

                        <tbody>

                            {students.map((student, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{student?.username}</td>
                                    <td>{student?.personal?.fullName}</td>
                                    <td>{student?.academic?.currentEducation.college}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )

}

export default AdminStudents;