import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import DataPage from './pages/DataPage'
import DynamicTestPage from './pages/DynamicTestPage'
import './styles/app.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DataPage/>}></Route>
          <Route path='/questions' element={<DynamicTestPage/>}></Route>

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
