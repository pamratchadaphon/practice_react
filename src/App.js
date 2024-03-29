import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import AddFarmer from './screens/AddFarmer'
import EditFarmer from './screens/EditFarmer'
import ShowFarmers from './screens/ShowFarmers'
import FarmerDetail from './screens/FarmerDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/addFarmer' element={<AddFarmer/>}/>
        <Route  path='/' element={<ShowFarmers/>}/>
        <Route  path='/farmer/edit/:id' element={<EditFarmer/>}/>
        <Route  path='/farmer/:id' element={<FarmerDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
