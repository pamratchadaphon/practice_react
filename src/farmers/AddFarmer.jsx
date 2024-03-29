import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AddFarmer = () => {
  const  [values, setValues] = useState({
    fname: '',
    subdistrict: '',
    district: '',
    province: '',
    phone: ''
  })

  const navigator = useNavigate()

  function handleSummit(e) {
    e.preventDefault()

    axios.post('/api/farmer/addFarmer', values)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
    navigator('/')
  }
  return (
    <div>
      <div>
        <h3> Add Farmer </h3>
        <form onSubmit={handleSummit}>
          <div>
            <label>Name</label>
            <input type='text' name='name' required onChange={(e)=>setValues({...values, fname:e.target.value})}/>
          </div>
          <div>
            <label>Subdistrict</label>
            <input type='text' name='subdistrict' required onChange={(e)=>setValues({...values, subdistrict:e.target.value})}/>
          </div>
          <div>
            <label>District</label>
            <input type='text' name='district' required onChange={(e)=>setValues({...values, district:e.target.value})}/>
          </div>
          <div>
            <label>Province</label>
            <input type='text' name='province' required onChange={(e)=>setValues({...values, province:e.target.value})}/>
          </div>
          <div>
            <label>Phone</label>
            <input type='number' name='subdistrict' required onChange={(e)=>setValues({...values, phone:e.target.value})}/>
          </div>
          <div>
            <Link to={'/'}>หน้าหลัก</Link>
            <button type='submit' >บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFarmer
