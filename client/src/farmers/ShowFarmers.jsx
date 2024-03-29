import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { v4 as uuid } from "uuid";

function ShowFarmers() {
    const [data, setData] = useState([])
    const [deleted, setDelete] = useState(true)

    useEffect(() => {
        if(deleted){
            setDelete(false)
        }
        axios.get('/api/farmer/getFarmers')
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    },[deleted])

    function handleSubmit(id){
        axios.delete(`/api/farmer/${id}`)
        .then((res)=>setDelete(true))
        .catch((err)=>console.log(err))
    }
    return (
        <div>
            <h1>All Farmer</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Subdistrict</th>
                        <th>District</th>
                        <th>Province</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((farmer)=>{
                            return (<tr key={uuid()}>
                                <td>{farmer.id}</td>
                                <td>{farmer.fname}</td>
                                <td>{farmer.subdistrict}</td>
                                <td>{farmer.district}</td>
                                <td>{farmer.province}</td>
                                <td>{farmer.phone}</td>
                                <td>
                                    <Link to={`/farmer/${farmer.id}`}>Detail</Link>
                                    <Link to={`/farmer/edit/${farmer.id}`}>Edit</Link>
                                    <button onClick={()=>handleSubmit(farmer.id)}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShowFarmers
