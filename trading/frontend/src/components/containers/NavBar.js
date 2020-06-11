import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Navbar} from "react-bootstrap"
import Logo from "../../public/logo2.png"

const Navigation = () => {
    return (
        <React.Fragment>
        <Navbar className="navbar lg py-3 navbar-dark bg-black shadow-sm">
            <div className="container">
            <Navbar.Brand href="/">
            <img src ={Logo} width="150" alt="" className="d-inline-block align-middle mr-2" /></Navbar.Brand>
            
            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>
        
            <div id="navbarSupportedContent" className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item"><a href="/" className="nav-link">Home <span className="sr-only">(current)</span></a></li>
                <li className="nav-item"><a href="https://github.com/rorieArmstrong/stock-trading-app" className="nav-link">About</a></li>
                <li className="nav-item"><a href="/d" className="nav-link">Portfolio</a></li>
                <li className="nav-item"><a href="/d/search" className="nav-link">Search</a></li>
                <li className="nav-item"><a href="/d/graph" className="nav-link">Analysis</a></li>
                <li className="nav-item"><a href="/logout" className="nav-link">Logout</a></li>
                </ul>
            </div>
            </div>
        </Navbar>
        </React.Fragment>
     );
}
 
export default Navigation;



/* className NavBar extends Component {
    
    render() {
        return (
           <div>
                <Link to='/d'>Homepage</Link>
                <Link to='/d/graph'>Charts</Link>
                <a href='/login'>Logout</a>
            </div> 
        );
    }
}

export default withRouter(NavBar); */