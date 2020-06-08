import React, { Component, Fragment } from 'react';
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import Graph from './pages/Graph.js'
import NavBar from './containers/NavBar'
import Footer from './containers/Footer'
import Search from './pages/Search'

class App extends Component {
    render() {
        return (
           <div>
               <NavBar/>
               <Graph/>
               <Router>
                   <Switch>
                       <Route path="/" exact component={Graph}/>
                       <Route path='/graph' component={Graph}/>
                       <Route path='/search' component={Search} />
                   </Switch>
               </Router>
               <Footer/>
           </div>

        )
    }
}

export default App;