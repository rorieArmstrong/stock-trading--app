import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

class NavBar extends Component {
    
    render() {
        return (
           <div>
                <Link to='/d'>Homepage</Link>
                <Link to='/d/graph'>Charts</Link>
                <a href='/logout'>Logout</a>
            </div> 
        );
    }
}

export default withRouter(NavBar);