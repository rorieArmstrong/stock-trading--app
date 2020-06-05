import React, { Component } from 'react'

export class Form extends Component {

    state = {
        data: [],
        loaded: false
    }

    render() {

        return (
            <div>
                <h1>Welcome to the trading Platform</h1>
                <h3>In order to proceed please Log in</h3>
                <div className="card card-body mt-4 mb-4">
                    <h2>Log In</h2>
                    <form action="api/users/" method="POST">

                        <div className="form-group">
                            <label>email</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"

                            />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input
                                className="form-control"
                                type="text"
                                name="password"

                            />
                        </div>
                        <div className="form-group">
                            <label>balance</label>
                            <input
                                className="form-control"
                                type="text"
                                name="balance"

                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Submit
            </button>
                        </div>
                    </form>
                </div>

            </div>
        )

    }
}

export default Form
