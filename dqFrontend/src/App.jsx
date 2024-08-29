import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';

import DqHome from './pages/DqHome';
import DataProfiling from './pages/DataProfiling';
import ExceptionRules from './pages/ExceptionRules';
import ExecuteRules from './pages/ExecuteRules';
import ExceptionRecords from './pages/ExceptionRecords';
import Charts from './pages/Charts';




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* path is the url end point and element is the component that is rendered */}
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />   
        <Route exact path='/dqHome' element={<DqHome />} />
        <Route exact path='/dataProfiling' element={<DataProfiling />} />
        <Route exact path='/exceptionRules' element={<ExceptionRules />} />
        <Route exact path='/executeRules' element={<ExecuteRules />} />
        <Route exact path='/exceptionRecords' element={<ExceptionRecords />} />
        <Route exact path='/charts' element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
}
