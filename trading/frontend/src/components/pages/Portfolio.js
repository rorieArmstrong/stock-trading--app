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

    buy = async (id, symbol, current) => { //id and current look useless?
        // buy an amount of stocks and update the balance and amount in database
        let price = this.state.prices[symbol]
        let amount = await prompt("How many stocks would you like to buy at " + price, 1);
        let cost = (amount*price)
        console.log(id, symbol, current, amount, this.state.userID, cost)
        if (cost <= this.state.balance){
            axios.patch(`/api/users/${this.state.userID}/`,{
                "balance": 30
            }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
            
            axios.post('/api/stocks/',{
                "stock_symbol": symbol,
                "stocks_bought_number": amount,
                "bought_at_price": parseInt(price),
                "userID": this.state.userID
                }, {headers:{'Content-Type': 'application/json'}})
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
                // window.alert('Stocks have been purchased')
        }else{
            window.alert('You do not have enough funds in your account!')
        }
    }

    sell = async (id, symbol, current) => {
        // sell an amount of stocks and update the balance and amount in database
    }

    remove = (id, amount) => {
        if (amount>0){
            // sell all then delete e.g sell(amount) then axios.delete
        }else{
            axios.delete('/api/stocks/' + id + '/')
            .then(this.setState({updating: false}))
            .catch(err => {console.log(err)})
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    watchlist(){
        const unique = [...new Set(this.state.data.map(stock => stock.stock_symbol))]
        return(
        unique.map(stock => {
            return(
                <React.Fragment>
                <h3>{stock}</h3>
                <p>Current Price: £{this.state.prices[stock]}</p>
                <button onClick={() => this.buy(stock.id, stock, stock.stocks_bought_number)}>Buy</button>
                </React.Fragment>
            )
        })
        )
    }

    render() {
        if(this.state.loading == true) {
            return <div> Loading </div>
        }
        console.log(this.state.data)
        return (
            <React.Fragment>
            <div>
                <div key='1'>
                    <h3>Value: {}</h3>
                    <h3>balance: {this.state.balance}</h3>
                    <Link to='/d/search'><button>Add Stock to Watchlist</button></Link>
                </div>
                <div>
                    {this.watchlist()}
                </div>
                <div key='2'>
                    <h2>Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Symbol</th>
                                <th>Amount</th>
                                <th>Price</th>
                                <th>Price of purchase</th>
                                <th>Time of purchase</th>
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
                                <td>{this.state.prices[stock.stock_symbol]}</td>
                                <td>{stock.bought_at_price}</td>
                                <td>{stock.bought_at_time}</td>
                                <td><button onClick={() => this.sell(stock.id, stock.stock_symbol, stock.stocks_bought_number)}>Sell</button></td>
                                <td><button onClick={() => this.remove(stock.id, stock.stocks_bought_number)}>Close</button></td>
                            </tr>
                            )
                        }
                        
                    )}
                    </tbody>
                    </table>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Portfolio;