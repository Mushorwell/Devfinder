import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from "./Components/Layout/Body/Body";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Body />
          <Footer />
        </div>
      </Router>
  );
}

export default App;
