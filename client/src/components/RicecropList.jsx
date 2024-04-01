import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";

function RicecropList() {
    const [data, setData] = useState([]);
    const [deleted, setDelete] = useState(true);

    useEffect(() => {
        if (deleted) {
            setDelete(false);
        }
        axios.get('/api/ricecrop/getAllRicecrop')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [deleted]);

    return (
        <div className='px-[30px] py-[30px]'>
            <Link className="btn btn-success" to={'/CreateRicecrop/:id'}>add</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">year</th>
                        <th className="text-center">startDate</th>
                        <th className="text-center">endDate</th>
                        <th className="text-center">เพิ่มเติม</th>
                        <th className="text-center">fermerID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((ricecrop) => {
                            return (
                                <tr key={uuid()}>
                                    <td className="text-center">{ricecrop.id}</td> 
                                    <td className="text-center">{ricecrop.year}</td> {/* Add text-center class */}
                                    <td className="text-center">{ricecrop.startDate}</td> {/* Add text-center class */}
                                    <td className="text-center">{ricecrop.endDate}</td> {/* Add text-center class */}
                                    <td className="text-center"> {/* Add text-center class */}
                                        <Link className="btn btn-primary" to={`/RicecropDetail/${ricecrop.id}`}>ดูรายละเอียด</Link>
                                    </td>
                                    <td className="text-center">{ricecrop.farmerID}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default RicecropList;
