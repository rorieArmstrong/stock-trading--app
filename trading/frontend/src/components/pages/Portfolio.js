import React, { Component } from 'react';
import { Link} from "react-router-dom";
import axios from 'axios'
// let yahooStockPrices = require('yahoo-stock-prices');

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            data: [],
            balance: 0,
            updating: false
        }
    }
    
    onLoad = () => {
        axios.get('/api/users')
        .then(data => { this.setState({userID: data.data[0].id, balance: data.data[0].balance}); return axios.get('/api/stocks/?user=' + data.data[0].id)})
        .then(res => this.setState({data: res.data}))
        .catch(error => {console.log(error)})
    }

    getPrice =(symbol) => {
        // let price = null
        // axios({
        //     "method":"GET",
        //     "url":"https://alpha-vantage.p.rapidapi.com/query",
        //     "headers":{
        //     "content-type":"application/octet-stream",
        //     "x-rapidapi-host":"alpha-vantage.p.rapidapi.com",
        //     "x-rapidapi-key":"1467346a6amsh9f2d2b808f465cfp1e71c3jsn1b9dff279cb0",
        //     "useQueryString":true
        //     },"params":{
        //     "datatype":"json",
        //     "function":"GLOBAL_QUOTE",
        //     "symbol":symbol
        //     }
        //     })
        //     .then((response)=>{
        //         console.log(response.data['Global Quote']['05. price'])
        //         return response.data['Global Quote']['05. price']
        //     })
        //     .catch((error)=>{
        //       console.log(error)
        //     })       
        // return yahooStockPrices.getCurrentPrice(symbol, function(err, price){
        //     return price
        // });
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
                                <p>Approximate Price: {this.getPrice(stock.stock_symbol)}</p>
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