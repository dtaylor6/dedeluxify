import React from 'react'
import LoginRedirect from '../LoginRedirect/LoginRedirect'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Home from '../Home/Home'
import StyledApp from './App.style'

const App = () => {
  return (
    <StyledApp>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginRedirect />} />
          </Routes>
        </>
      </BrowserRouter>
    </StyledApp>
  )
}

export default App