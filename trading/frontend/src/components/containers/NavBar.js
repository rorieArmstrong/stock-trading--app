import React, { Component } from 'react';
class NavBar extends Component {
    
    render() {
        return (
           <div>
                <a href='/'>Homepage</a>
                <a href='/d/graphs'>Charts</a>
                <a href='/'>Logout</a>
            </div> 
        );
    }
}

export default NavBar;