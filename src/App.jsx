import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import CreateEmployee from './pages/CreateEmployee'
import ListEmployee from './pages/ListEmployee'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/list" element={<ListEmployee />} />
      </Routes>
    </Router>
  )
}

export default App
