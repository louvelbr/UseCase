import Home from './pages/Home/Home';
import React from 'react';
import './styles/App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Predict from './pages/Predict/Predict';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </div>
  );
  
}

export default App;
