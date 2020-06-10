import React, { Component } from 'react';
import axios from 'axios'
import TradingViewWidget, {Themes} from 'react-tradingview-widget'
import { thatReturnsThis } from 'react-tradingview-widget/dist/vendor';

class Graph extends Component {

    //["AAPL","IBM","TSLA","AMD","MSFT","GOOG","FB","RMG",'NTDMF', 'RIG', 'RRC', 'COTY', 'SSL']

    constructor(props) {
        super(props);
        this._ref = React.createRef();
        this.state = {
            watchlist: [],
            userID:''
        }
    }

     componentDidMount() {
        axios.get('/api/users')
        .then(data => { this.setState({userID: data.data[0].id, balance: data.data[0].balance}); return axios.get('/api/stocks/?user=' + data.data[0].id)})
        .then(res => {
            let arr = []
            res.data.map(stock => {
                arr.push(stock.stock_symbol)
            })
            console.log(arr)
            this.setState({watchlist: arr})})
        .catch(error => {console.log(error)})
    }

    render() {
        return (
            <TradingViewWidget
                symbol="NASDAQ:AAPL"
                theme={Themes.LIGHT}
                locale="uk"
                watchlist= {this.state.watchlist}
            />
        )
    }
}

export default Graph;