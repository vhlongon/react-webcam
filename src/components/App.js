import './app.css';
import React from 'react';
import { Link } from 'react-router-dom';

const App = props => {
  return (
    <div className="links">
      <Link className="link" to={{pathname: '/photobooth'}}>Photobooth</Link>
      <Link className="link" to={{ pathname: '/images'}}>Images list</Link>
    </div>
  );
}

export default App;