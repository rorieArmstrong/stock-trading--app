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
        .then(data => { this.setState({userID: data.data[0].id, balance: Number(data.data[0].balance), value: Number(data.data[0].balance)}); return axios.get('/api/stocks/?user=' + data.data[0].id)})
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
        let cost = (Number(amount)*price)
        console.log(id, symbol, current, amount, this.state.userID, cost)
        if (cost <= this.state.balance){
            console.log(this.state.balance - cost)
            axios.patch('/api/users/'+this.state.userID+'/',{
                "balance": parseFloat(this.state.balance - cost).toFixed(2)
            }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
            if (current === 0 && amount != null){
                axios.put('/api/stocks/'+id+'/',{
                    "stock_symbol": symbol,
                    "stocks_bought_number": amount,
                    "bought_at_price": price,
                    "userID": this.state.userID
                    }, {headers:{'Content-Type': 'application/json'}})
                .then(res => {console.log(res)})
                .then(() => {window.location.reload(true)})
                .catch(error => {console.log(error)})
                window.alert('Stocks have been purchased')
            }else if(amount != null){
                axios.post('/api/stocks/',{
                    "stock_symbol": symbol,
                    "stocks_bought_number": amount,
                    "bought_at_price": price,
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
        console.log(amount)
        let gain = Number(amount*price)
        console.log(id, symbol, current, amount, this.state.userID, gain)
        // patch
        if (amount <= current){
            console.log((this.state.balance + gain), this.state.userID)
            axios.patch('/api/users/'+this.state.userID+'/',{
                "balance": parseFloat(this.state.balance + gain).toFixed(2)
            }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
            if ((current - amount) === 0){
                axios.delete('/api/stocks/'+id+'/')
                .then(res => {console.log(res)})
                .then(() => {window.location.reload(true)})
                .catch(error => {console.log(error)})
                window.alert('Stocks have been sold')
            }else if(amount != null){
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
            let gain = Number(amount*price)
            axios.patch('/api/users/'+this.state.userID+'/',{
                "balance": parseFloat(this.state.balance + gain).toFixed(2)
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

    sum = (data) => {
        let value = Number(this.state.balance);
        data.map(stock => {
            value += Number(stock.stocks_bought_number * this.state.prices[stock.stock_symbol])
        })
        return value
    }

    componentDidMount() {
        this.onLoad()
        console.log(this.state.prices)
    }

    watchlist(){
        const unique = [...new Set(this.state.data.map(stock => stock.stock_symbol))]
        return(
        unique.map(stock => {
            return(
                <React.Fragment>
                <div className="single-stock">
                <p className="stock-name">{stock}</p>
                <p>Current Price: ${this.state.prices[stock]}</p>
                <button  className = "btn btn-dark" onClick={() => this.buy(stock.id, stock, stock.stocks_bought_number)}>Buy</button>
                </div>
                </React.Fragment>
            )
        })
        )
    }

    timeConvert(timeOfPurchase){
        const isoFormat = new Date(timeOfPurchase)
        const newFormat = new Intl.DateTimeFormat("en-GB", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(isoFormat);
        console.log(isoFormat)
        return newFormat
    }

    render() {
        if(this.state.loading == true) {
            return <div> Loading </div>
        }
        return (
            <React.Fragment>
            <div className="stock-table">
                <div className = "table-top" key='1'>
                  <h2>Value: ${this.sum(this.state.data)}</h2>
                  <h2>Balance: ${this.state.balance}</h2>
                </div>
                <div className="watchlist-orders-container">
                <div className="watchlist">
                    <h2>Watchlist</h2>
                    <Link to='/d/search'><button className=" add-stock btn btn-dark">Add Stock to Watchlist</button></Link>                    {this.watchlist()}
                </div>
                <div className="stock-orders" key='2'>
                    <h2>Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Symbol</th>
                                <th>No. of Shares</th>
                                <th>Current Price</th>
                                <th>Price of Purchase</th>
                                <th>Time of Purchase</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                    {this.state.data.map(stock => {
                        if (stock.stocks_bought_number > 0)
                            return (
                            <tr key={stock.id}>
                                <td>{stock.id}</td>
                                <td>{stock.stock_symbol}</td>
                                <td>{stock.stocks_bought_number}</td>
                                <td>${this.state.prices[stock.stock_symbol]}</td>
                                <td>${stock.bought_at_price}</td>
                                <td>{this.timeConvert(stock.bought_at_time)}</td>
                                <td><button className="btn btn-dark" onClick={() => this.sell(stock.id, stock.stock_symbol, stock.stocks_bought_number)}>Sell</button></td>
                                <td><button className="btn btn-danger" onClick={() => this.remove(stock.id, stock.stock_symbol, stock.stocks_bought_number)}>Close</button></td>
                            </tr>
                            )
                        }
                    )}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}
//<img src={require(Logo)} />

export default Portfolio;
