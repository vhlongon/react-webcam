import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import ImagesList from './components/ImagesList';
import Photobooth from './components/Photobooth';

const Routes = () => (
    <Router>
      <div className="container">
        <Route exact path="/" component={App}/>
        <Route path="/photobooth" component={Photobooth}/>
        <Route path="/images" component={ImagesList}/>
      </div>
    </Router>
);

export default Routes;