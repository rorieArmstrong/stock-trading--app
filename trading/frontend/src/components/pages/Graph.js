import React, { Component } from 'react';
import TradingViewWidget, {Themes} from 'react-tradingview-widget'

class Graph extends Component {


    constructor(props) {
        super(props);
        this._ref = React.createRef();
        this.state = {
            watchlist: ["AAPL","IBM","TSLA","AMD","MSFT","GOOG","FB","RMG",'NTDMF', 'RIG', 'RRC', 'COTY', 'SSL']
        }
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