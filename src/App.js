import React from 'react'
import LoginRedirect from './components/LoginRedirect/LoginRedirect'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Home from './components/Home/Home'

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginRedirect />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App