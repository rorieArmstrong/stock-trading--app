import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
                        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">Trading Platform</a>
                <li class="nav-item">
                    <a class="nav-link" href= "/accounts/logout/">Features</a>
                </li>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                
                </ul>
                
            </div>
            </nav>
        )
    }
}

export default Header
