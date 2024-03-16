import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './Page/Login'
import Register from './Page/Register'
import Home from './Page/Home'
import Add from './Page/Add'
import Edit from './Page/Edit'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Login/> }/>
      <Route path='/reg' element={ <Register/> }/>
      <Route path='/home' element={ <Home/> }/>
      <Route path='/add' element={ <Add/> }/>
      <Route path='/edit/:id' element={ <Edit/> }/>
    </Routes>
  )
}

export default App