import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CreateRicecrop = () => {
  const {id} = useParams()
  const idAsInt = Number(id);
  const  [values, setValues] = useState({
    year: '',
    startDate: '',
    endDate: '',
    farmerID: id
  })
  const navigate = useNavigate() // แก้จาก navigator เป็น navigate

  function handleSubmit(e) { // แก้จาก handleSummit เป็น handleSubmit
    e.preventDefault()

    axios.post('/api/ricecrop/addRicecrop', values)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    navigate(`/ricecrop/${idAsInt}`) // แก้จาก navigator(`/ricecrop/${id}`) เป็น navigate(`/ricecrop/${id}`)
  }
  return (
    <div className='flex'>
      <div className='basis-[16%] h-[100vh]'>
        <Sidebar/>
      </div>
      <div className='basis-[84%] border'>
      <div className='px-[30px] py-[30px]'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            สร้างรอบการปลูกข้าว
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}> {/* แก้จาก handleSummit เป็น handleSubmit */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                ปีที่ปลูก
              </label>
              <div className="mt-2">
                <input
                  id="year"
                  name="year"
                  type="number"
                  required
                  onChange={(e)=>setValues({...values, year:e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                  วันที่ปลูก
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  autoComplete="startDate"
                  required
                  onChange={(e)=>setValues({...values, startDate:e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                  วันที่เก็บเกี่ยว
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  autoComplete="endDate"
                  required
                  onChange={(e)=>setValues({...values, endDate:e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                เพิ่ม
              </button>
            </div>
          </form>
          
        </div>
      </div>
      </div>

      </div>
    </div>
  )
}

export default CreateRicecrop
