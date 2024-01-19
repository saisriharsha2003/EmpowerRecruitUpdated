import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { notify } from '../toast';

const AdminSelected = () => {
    const [selected, setSelected] = useState([]);

    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetchSelected = async () => {
            try {
                const response = await axios.get('/admin/selected');

                const selected = response?.data
                setSelected(selected);
            } catch (err) {
                notify('failed', err?.response?.data?.message);
            }
        }
        fetchSelected();
    }, [axios]);

    return (
        <>

            <div className="card m-2 mx-5">
                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Student id</th>
                                <th scope="col">Company name</th>
                                <th scope="col">Job role</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Applied on</th>
                            </tr>
                        </thead>

                        <tbody>

                            {selected.map((selected, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{selected?.companyName}</td>
                                    <td>{selected?.jobRole}</td>
                                    <td>{selected?.salary}</td>
                                    <td>{new Date(selected?.appliedOn).toString().slice(4, 21)}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )
}

export default AdminSelected;