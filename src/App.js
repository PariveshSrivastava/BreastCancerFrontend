import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import MalariaPredict from './components/MalariaPredict.js';
import BreastCancerPredict from './components/BreastCancerPredict.js';
import ImageRetrival from './components/ImageRetrival.js';
import ImageProcessing from './components/ImageProcessing.js';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Navbar />}  >
            <Route path="/" exact element={<Home />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/MalariaPredict" exact element={<MalariaPredict />} />
            <Route path="/ImageRetrival" exact element={<ImageRetrival />} />
            <Route path="/BreastCancerPredict" exact element={<BreastCancerPredict />} />
            <Route path="/ImageProcessing" exact element={<ImageProcessing />} />
          </Route>
        </Routes>
      </Router>
      <Footer></Footer>
      {/* <AdminPage></AdminPage> */}
    </>
  )
}
