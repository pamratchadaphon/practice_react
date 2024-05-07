import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import RicecropList from './pages/RicecropList'
import RicecropDetail from './pages/RicecropDetail'
import CreateRicecrop from './pages/CreateRicecrop'
import Login from './pages/Login'
import Register from './pages/Register'
import Income from './pages/Income.jsx'
import Expense from './pages/Expense.jsx'
import RicecropDetailMonth from './pages/RicecropDetailMonth.jsx';
import Variety from './pages/Variety.jsx';
import VarietyDetail from './pages/VarietyDetail.jsx';
import Disease from './pages/Disease.jsx';
import DiseaseDetail from './pages/DiseaseDetail.jsx';
import ManageVariety from './pages/admin/ManageVariety.jsx';
import AddVariety from './pages/admin/AddVariety.jsx';
import Detail from './pages/Detail.jsx';
import Home from './pages/Home.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ricecrop/:id' element={<RicecropList/>}/>
        <Route path='/RicecropDetail/:idFarmer/:idRicecrop' element={<RicecropDetail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/CreateRicecrop/:id' element={<CreateRicecrop/>}/>
        <Route path='/Income/:idFarmer/:idRicecrop' element={<Income/>}/>
        <Route path='/Expense/:idFarmer/:idRicecrop' element={<Expense/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/RicecropDetailMonth/:idFarmer/:idRicecrop' element={<RicecropDetailMonth/>}/>
        <Route path='/variety/:idFarmer' element={<Variety/>}/>
        <Route path='/varietyDetail/:idFarmer/:idVariety' element={<VarietyDetail/>}/>
        <Route path='/disease/:idFarmer' element={<Disease/>}/>
        <Route path='/diseaseDetail/:idFarmer/:idDisease' element={<DiseaseDetail/>}/>
        <Route path='/manageVariety' element={<ManageVariety/>}/>
        <Route path='/addVariety' element={<AddVariety/>}/>
        <Route path='/detail/:idFarmer/:idRicecrop' element={<Detail/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
