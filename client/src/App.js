import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Ricecrop from './pages/Ricecrop'

import AddFarmer from './farmers/AddFarmer'
import EditFarmer from './farmers/EditFarmer'
import ShowFarmers from './farmers/ShowFarmers'
import FarmerDetail from './farmers/FarmerDetail'
import RicecropDetail from './pages/RicecropDetail'
import CreateRicecrop from './pages/CreateRicecrop'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/addFarmer' element={<AddFarmer/>}/>
        <Route path='/farmers' element={<ShowFarmers/>}/>
        <Route path='/farmer/edit/:id' element={<EditFarmer/>}/>
        <Route path='/farmer/:id' element={<FarmerDetail/>}/>
        <Route path='/ricecrop/:id' element={<Ricecrop/>}/>
        <Route path='/RicecropDetail/:id' element={<RicecropDetail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/CreateRicecrop/:id' element={<CreateRicecrop/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
