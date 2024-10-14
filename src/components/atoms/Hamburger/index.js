import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles.css';

function Hamburger({ isOpen, toggle }) {
  return (
    <div className="hamburger" onClick={toggle}>
      {isOpen ? <FaTimes /> : <FaBars />}
    </div>
  );
}

export default Hamburger;
