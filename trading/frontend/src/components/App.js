import React, { Component, Fragment } from 'react';
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import Graph from './pages/Graph.js'
import NavBar from './containers/NavBar'
import Footer from './containers/Footer'
import Search from './pages/Search'
import Portfolio from './pages/Portfolio.js';
import axios from 'axios';

class App extends Component {
    render() {
        return (
           <div>
               <Router>
                    <NavBar/>
                    <Switch>
                       <Route path="/d" exact component={Portfolio}/>
                       <Route path='/d/graph' component={Graph}/>
                       <Route path='/d/search' component={Search} />
                   </Switch>
               </Router>
               <Footer/>
           </div>

        )
    }
}

export default App;