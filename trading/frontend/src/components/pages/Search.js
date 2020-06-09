import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            query: '',
            results: []
        }
    };

    handleChange = (e) => {
        this.setState({query: e.target.value})
    }

    getData = async (query) => {
        this.setState({search: true})
        url = `http://autoc.finance.yahoo.com/autoc?query=${query}&region=EU&lang=en-GB`
        let res = await (await fetch(url)).json();
        this.setState({results: res.ResultSet.Result})
    };

    addToWatchlist(symbol){

    }
    
    render() {
        if (!this.state.search) {
            return (
                <div>
                    <form onSubmit={this.getData()}>
                        <label>Search: 
                        <input 
                                type='text' 
                                onChange={this.handleChange()} 
                                value={this.state.query} 
                                name='query' 
                                placeholder='Search'/>
                        </label>
                        <button type='submit'>Search</button>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        <form onSubmit={this.getData()}>
                            <label>Search: 
                            <input 
                                    type='text' 
                                    onChange={this.handleChange()} 
                                    value={this.state.query} 
                                    name='query' 
                                    placeholder='Search'/>
                            </label>
                            <button type='submit'>Search</button>
                        </form>
                    </div>
                    <div>
                        <h3>Results for {this.state.query}</h3>
                        {results.map(res => {
                            return(
                                <div>
                                    <h3>{res.name}</h3>
                                    <p>{res.symbol}</p>
                                    <button onClick={this.addToWatchlist(res.symbol)}>Add to watchlist</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
}

export default Search;