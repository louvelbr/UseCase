import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Predict from './pages/Predict/Predict';
import './styles/index.css';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { HashRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
  <HashRouter>
    <TransitionGroup>
      <CSSTransition key={1} classNames="slide" timeout={1000}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="results" element={<Predict/>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  </HashRouter>
  </React.StrictMode>,
);

