import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <div className="logo">
        <FontAwesomeIcon icon={faPlayCircle} className="logo-icon" />
        <h1>NextWatch</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;