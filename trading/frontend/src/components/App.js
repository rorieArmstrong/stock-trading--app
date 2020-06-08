import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from "./layout/Header";
import Form from "./layout/Form";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <Form />
                </div>
            </Fragment>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));