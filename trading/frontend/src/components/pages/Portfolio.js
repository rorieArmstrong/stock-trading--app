import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
// let yahooStockPrices = require('yahoo-stock-prices');

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userID: null,
            data: [],
            balance: 0,
            updating: false,
            prices: {}
        }
    }
    
    onLoad = async () => {
        await axios.get('/api/users')
        .then(data => { this.setState({userID: data.data[0].id, balance: data.data[0].balance}); return axios.get('/api/stocks/?user=' + data.data[0].id)})
        .then((res) => {
            this.setState({data: res.data})
            res.data.map((e) => {
                console.log(e)
                this.getPrice(e.stock_symbol)
            })
        })

        .catch(error => {console.log(error)})
    }

    getPrice = async (symbol) => {
        console.log(symbol)
        let price = null
        await axios({
            "method":"GET",
            "url":`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=brgc7g7rh5r8gtveo3hg`,
            "headers": {
                "content-type":"text/json"
            },
        })
        .then((response) => {
            console.log(response.data.c)
            this.setState({prices: {...this.state.prices, [symbol]: response.data.c}})
        })
        .catch((error) => {
            console.log(error)
        })
        console.log(price)
        return price
    }

    buy = () => {
        // buy an amount of stocks and update the balance and amount in database
    }

    sell = () => {
        // sell an amount of stocks and update the balance and amount in database
    }

    remove = (id, amount) => {
        if (amount>0){
            // sell all then delete
        }else{
            axios.delete('/api/stocks/' + id + '/')
            .then(this.setState({updating: false}))
            .catch(err => {console.log(err)})
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    render() {
        if(this.state.loading == true) {
            return <div> Loading </div>
        }
        console.log(this.state.data)
        return (
            <div>
                <div key='1'>
                    <h3>Value: {}</h3>
                    <h3>balance: {this.state.balance}</h3>
                    <Link to='/d/search'><button>Add Stock to Watchlist</button></Link>
                </div>
                <div key='2'>
                    {this.state.data.map(stock => {
                        return(
                            <div key={stock.stock_symbol}>
                                <h3>{stock.stock_symbol}</h3>
                                <p>Amout: {stock.stocks_bought_number}</p>
                                <p>Bought at: {stock.bought_at_price}</p> 
                                <p>Approximate Price: {this.state.prices[stock.stock_symbol]}</p>
                                <button onClick={this.buy(stock.id)}>Buy</button>
                                <button onClick={this.sell(stock.id)}>Sell</button>
                                <button onClick={() => this.remove(stock.id, stock.stocks_bought_number)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Portfolio;