import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import LoginB from './login/Tbox';
import Home from './main/Home';



class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <Route exact path="/" component={LoginB} />
          <Route path="/maintenance" component={Home} />
        </div>
      </Router>
    )
  }
}

export default App;
