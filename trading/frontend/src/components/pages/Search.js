import React, { Component } from 'react';
import axios from 'axios'
const stocks = require('stock-ticker-symbol');
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            query: '',
            results: [],
            userID: null
        }
    };

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }

    getData = () => {
        event.preventDefault()
        let results = stocks.search(this.state.query)
        console.log(results)
        this.setState({search: true})
        this.setState({results: results})
    };

    addToWatchlist = (symbol) => {
        axios.post('/api/stocks/',{
            "stock_symbol": symbol,
            "stocks_bought_number": 0,
            "bought_at_price": 0,
            "userID": this.state.userID
            }, {headers:{'Content-Type': 'application/json'}})
        .then(res => {console.log(res)})
        .catch(error => {console.log(error)})
        window.alert('Stock added to your watchlist')
    }
    
    componentDidMount() {
        axios.get('/api/users')
        .then(data => this.setState({userID: data.data[0].id}))
    }

    render() {
        if (!this.state.search) {
            return (
                <div>
                    <form onSubmit={() => this.getData(this.state.query)}>
                        <label>Search: 
                        <input 
                                type='text' 
                                onChange={this.handleChange} 
                                value={this.state.query} 
                                name='query' 
                                placeholder='Search'/>
                        </label>
                        <button type='submit'>Search</button>
                    </form>
                </div>
            )
        }
        else if(this.state.results !== undefined){
            return (
                <div>
                    <div>
                        <form onSubmit={this.getData}>
                            <label>Search: 
                            <input 
                                    type='text' 
                                    onChange={this.handleChange} 
                                    value={this.state.query} 
                                    name='query' 
                                    placeholder='Search'/>
                            </label>
                            <button type='submit'>Search</button>
                        </form>
                    </div>
                    <div>
                        <h3>Results for {this.state.query}</h3>
                        {this.state.results.map(res => {
                            return(
                                <div key={res.ticker}>
                                    <h3>{res.name}</h3>
                                    <p>{res.ticker}</p>
                                    <button onClick={() => this.addToWatchlist(res.ticker)}>Add to watchlist</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <form onSubmit={() => this.getData(this.state.query)}>
                            <label>Search: 
                            <input 
                                    type='text' 
                                    onChange={this.handleChange} 
                                    value={this.state.query} 
                                    name='query' 
                                    placeholder='Search'/>
                            </label>
                            <button type='submit'>Search</button>
                        </form>
                    </div>
                    <div>
                        <h3>
                            There was an error in the search!
                        </h3>
                    </div>
                </div>
            )
        }
    }
}

export default Search;