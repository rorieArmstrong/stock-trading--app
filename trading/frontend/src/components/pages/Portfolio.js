import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

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
                this.getPrice(e.stock_symbol)
            })
        })

        .catch(error => {console.log(error)})
    }

    getPrice = async (symbol) => {
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
        return price
    }

    buy = async (id, symbol, current) => {
        // buy an amount of stocks and update the balance and amount in database
        let price = this.state.prices[symbol]
        let amount = await prompt("How many stocks would you like to buy at " + price, 1);
        let cost = (amount*price)
        console.log(id, symbol, current, amount, this.state.userID, cost)
        if (cost <= this.state.balance){
            axios.patch('/api/users/'+this.state.userID+'/',{
                "balance": parseInt(this.state.balance - cost)
            }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
            if (current === 0){
                axios.put('/api/stocks/'+id+'/',{
                    "stock_symbol": symbol,
                    "stocks_bought_number": amount,
                    "bought_at_price": parseInt(price),
                    "userID": this.state.userID
                    }, {headers:{'Content-Type': 'application/json'}})
                .then(res => {console.log(res)})
                .then(() => {window.location.reload(true)})
                .catch(error => {console.log(error)})
                window.alert('Stocks have been purchased')
            }else{
                axios.post('/api/stocks/',{
                    "stock_symbol": symbol,
                    "stocks_bought_number": amount,
                    "bought_at_price": parseInt(price),
                    "userID": this.state.userID
                    }, {headers:{'Content-Type': 'application/json'}})
                .then(res => {console.log(res)})
                .then(() => {window.location.reload(true)})
                .catch(error => {console.log(error)})
                window.alert('Stocks have been purchased')
            }
        }else{
            window.alert('You do not have enough funds in your account!')
        }
    }

    sell = async (id, symbol, current) => {
        // sell an amount of stocks and update the balance and amount in database
        let price = this.state.prices[symbol]
        let amount = await prompt("How many stocks would you like to sell at " + price, 1);
        let gain = (amount*price)
        console.log(id, symbol, current, amount, this.state.userID, gain)
        // patch
        if (amount <= current){
            axios.patch('/api/users/'+this.state.userID+'/',{
                "balance": parseInt(this.state.balance + gain)
            }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
            if ((current - amount) === 0){
                axios.delete('/api/stocks/'+id+'/')
                .then(res => {console.log(res)})
                .then(() => {window.location.reload(true)})
                .catch(error => {console.log(error)})
                window.alert('Stocks have been sold')
            }else{
                axios.patch('/api/stocks/'+id+'/',{
                    "stocks_bought_number": (current-amount)
                    }, {headers:{'Content-Type': 'application/json'}})
                .then(res => {console.log(res)})
                .then(() => {window.location.reload(true)})
                .catch(error => {console.log(error)})
                window.alert('Stocks have been sold')
            }
        }else{
            window.alert('You do not have enough stocks in this trade!')
        }
    }

    remove = (id, symbol, amount) => {
        if (amount>0){
            let price = this.state.prices[symbol]
            let gain = (amount*price)
            axios.patch('/api/users/'+this.state.userID+'/',{
                "balance": parseInt(this.state.balance + gain)
            }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
        }
        axios.delete('/api/stocks/' + id + '/')
        .then(res => {console.log(res)})
        .then(this.setState({updating: false}))
        .then(() => {window.location.reload(true)})
        .catch(err => {console.log(err)})
    }

    componentDidMount() {
        this.onLoad()
    }

    render() {
        if(this.state.loading == true) {
            return <div> Loading </div>
        }
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
                            <div>
                                <h3>{stock.stock_symbol}</h3>
                                <p>Amout: {stock.stocks_bought_number}</p>
                                <p>Bought at: {stock.bought_at_price}</p> 
                                <p>Approximate Price: {this.state.prices[stock.stock_symbol]}</p>
                                <button onClick={() => this.buy(stock.id, stock.stock_symbol, stock.stocks_bought_number)}>Buy</button>
                                <button onClick={() => this.sell(stock.id, stock.stock_symbol, stock.stocks_bought_number)}>Sell</button>
                                <button onClick={() => this.remove(stock.id, stock.stock_symbol, stock.stocks_bought_number)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
//<img src={require(Logo)} />

export default Portfolio;