import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Second from './Second';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './css/webflow.css';




import './css/refugeehubbuild.webflow.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wa/*" element={<Second />}>
        </Route>
      </Routes>
    </Router>
);


