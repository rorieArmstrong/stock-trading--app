import React, { Component } from 'react';
class NavBar extends Component {
    
    render() {
        return (
           <div>
                <a href='/'>Homepage</a>
                <a href='/d/graph'>Charts</a>
                <a href='/logout'>Logout</a>
            </div> 
        );
    }
}

export default NavBar;