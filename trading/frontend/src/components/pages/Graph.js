import React, { Component } from 'react';

class Graph extends Component {
    constructor(props) {
        super(props);
        this._ref = React.createRef();
        this.state = {
            watchlist: ["AAPL","IBM","TSLA","AMD","MSFT","GOOG"]
        }
    }

    componentDidMount() {
        const script = document.createElement('script');
        const fun = document.createElement('script')
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript';
        fun.type = 'text/javascript';
        fun.async = true
        fun.innerHTML = 'new TradingView.widget(' + JSON.stringify({
            "container_id": "watchlist",
            "width": 998,
            "height": 610,
            "symbol": "NASDAQ:AAPL",
            "interval": "D",
            "timezone": "exchange",
            "theme": "light",
            "style": "1",
            "toolbar_bg": "#f1f3f6",
            "withdateranges": true,
            "allow_symbol_change": true,
            "save_image": false,
            "watchlist": this.state.watchlist,
            "locale": "uk"
        }) + ')'
        document.getElementById('container').appendChild(script);
        document.getElementById('container').appendChild(fun);
    }
    
    render() {
        return (
            <div>
                <div className="tradingview-widget-container" id='container'>
                    <div id="watchlist"></div>
                    <div className="tradingview-widget-copyright">
                        <a href="https://uk.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank">
                            <span className="blue-text">Chart</span>
                        </a> by TradingView
                    </div>
                </div>
            </div>
        )
    }
}

export default Graph;