import React, { Component } from 'react';
import { Link} from "react-router-dom";
import axios from 'axios'

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    getUser = () => {
        axios.get('/api/users')
        .then(data => this.setState({userID: data.data[0].id}))
        .catch(error => {console.log(error)})

    }
    
    onLoad = () => {
        axios.get('/api/users')
        .then(data => { this.setState({userID: data.data[0].id}); return axios.get('/api/stocks/?user=' + data.data[0].id)})
        .then(res => this.setState({data: res.data}))
        .catch(error => {console.log(error)})
    }

    buy = () => {}

    sell = () => {}

    componentDidMount() {
        this.onLoad()
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Value: {}</h3>
                    <h3>balance: {}</h3>
                    <Link to='/d/search'><button>Add Stock to Watchlist</button></Link>
                </div>
                <div>
                    {this.state.data.map(stock => {
                        return(
                            <div>
                                <h3>{stock.stock_symbol}</h3>
                                <p>Amout: {stock.stocks_bought_number}</p>
                                <p>Bought at: {stock.bought_at_price}</p> 
                                <p>Current Price: </p>
                                <button onClick={this.buy(stock.id)}>buy</button>
                                <button onClick={this.sell(stock.id)}>Sell</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Portfolio;