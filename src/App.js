import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Form from './Component/Form';
import List from './Component/List';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/list" element={<List/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
