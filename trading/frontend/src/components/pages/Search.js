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
            userID: null,
            searched: ''
        }
    };

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }

    getData = () => {
        // event.preventDefault()
        this.setState({searched: this.state.query})
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
                    <form className="searchForm" onSubmit={() => this.getData()}>
                        <input 
                                id="searchBox"
                                type='text' 
                                onChange={this.handleChange} 
                                value={this.state.query} 
                                name='query' 
                                placeholder='Search'/>
                        <button type='submit'>Search</button>
                    </form>
                </div>
            )
        }
        else if(this.state.results !== undefined){
            return (
                <div>
                    <div>
                        <form className="searchForm" onSubmit={() => this.getData()}>
                            <input 
                                    type='text' 
                                    onChange={this.handleChange} 
                                    value={this.state.query} 
                                    name='query' 
                                    placeholder='Search'/>

                            <button type='submit'>Search</button>
                        </form>
                    </div>
                    <div className="searchResults">
                        <h3>Results for {this.state.searched}</h3>
                        <table className="searchTable">
                            <thead>
                                <tr>
                                    <th className="tableCompany">Company Name</th>
                                    <th className="tableSymbol">Company Symbol</th>
                                    <th className="tableButton"></th>
                                </tr>
                            </thead>
                            <tbody>
                        {this.state.results.map(res =>{
                            return(
                                <tr key={res.ticker}>
                                    <td className="tableCompany">{res.name}</td>
                                    <td className="tableSymbol">{res.ticker}</td>
                                    <td className="tableButton btn btn-black"><button id="addButton" onClick={() => this.addToWatchlist(res.ticker)}>Add to watchlist</button></td>
                                </tr>
                            )
                        })}
                            </tbody>
                        </table>
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