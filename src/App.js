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
    <div style={{ position: 'absolute', left: '0px', width: '100%', overflow: 'hidden' }}>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginRedirect />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  )
}

export default App