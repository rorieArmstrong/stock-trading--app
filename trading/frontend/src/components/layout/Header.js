import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-sm navbar-light bg-light justify-content-between">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Trading Platform</a>
                    <a class="nav-link" href="/logout">Logout</a>
                </div>
            </nav>
        )
    }
}

export default Header
