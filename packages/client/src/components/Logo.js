import React from 'react';
import { Link } from 'react-router-dom';
import '../css/logo.css'

const Logo  = () => {
  return (
    <Link to='/' href="#" className="logo">
      Morello
    </Link>
  );

};

export default Logo;
