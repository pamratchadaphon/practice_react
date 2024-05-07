import React from 'react';
import image from '../images/1.jpg'; 
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar/>
      <img src={image} alt="" className="image w-100vh " /> 
    </div>
  );
}

export default Home;
