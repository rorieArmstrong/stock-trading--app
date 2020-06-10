import React, { Component } from 'react';
import { Link} from "react-router-dom";
import axios from 'axios'

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            data: [],
            balance: 0
        }
    }
    
    onLoad = () => {
        axios.get('/api/users')
        .then(data => { this.setState({userID: data.data[0].id, balance: data.data[0].balance}); return axios.get('/api/stocks/?user=' + data.data[0].id)})
        .then(res => this.setState({data: res.data}))
        .catch(error => {console.log(error)})
    }

    buy = () => {}

    sell = () => {}

    remove = (id, amount) => {
        if (amount>0){
            // sell all then delete
        }else{
            axios.delete('/api/stocks/'+id+'/')
            .then()
            .catch(err => {console.log(err)})
        }
    }

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
                                <button onClick={this.buy(stock.id)}>Buy</button>
                                <button onClick={this.sell(stock.id)}>Sell</button>
                                <button onClick={this.removeFromWatchlist(stock.id, stock.stocks_bought_number)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Portfolio;