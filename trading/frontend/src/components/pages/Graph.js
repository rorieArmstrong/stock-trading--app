import React, { Component } from 'react';

class Graph extends Component {
    constructor(props) {
        super(props);
        this._ref = React.createRef();
        this.state = {
            watchlist: [
                "AAPL",
                "IBM",
                "TSLA",
                "AMD",
                "MSFT",
                "GOOG"
            ],
            obj: {
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
                    "watchlist": [
                        "AAPL",
                        "IBM",
                        "TSLA",
                        "AMD",
                        "MSFT",
                        "GOOG"
                    ],
                    "locale": "uk"
                }
        }
    }

    obj = () => { return {
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
        }}

    // componentDidMount() {
    //     const script = document.createElement('script');
    //     script.src = 'https://s3.tradingview.com/tv.js'
    //     script.async = true;
    //     script.innerHTML = {
    //         "container_id": "watchlist",
    //         "width": 998,
    //         "height": 610,
    //         "symbol": "NASDAQ:AAPL",
    //         "interval": "D",
    //         "timezone": "exchange",
    //         "theme": "light",
    //         "style": "1",
    //         "toolbar_bg": "#f1f3f6",
    //         "withdateranges": true,
    //         "allow_symbol_change": true,
    //         "save_image": false,
    //         "watchlist": this.state.watchlist,
    //         "locale": "uk"
    //     }
    //     console.log(script)
    //     console.log(this._ref)
    //     this._ref.current.appendChild(script);
    // }
    
    render() {
        return (
            <div>
                <div className="tradingview-widget-container">
                    <div id="watchlist"></div>
                    <div className="tradingview-widget-copyright">
                        <a href="https://uk.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank">
                            <span className="blue-text"></span>
                        </a> by TradingView
                    </div>
                    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
                    <script type="text/javascript">
                        new TradingView.widget({this.state.obj})
                    </script>
                </div>
            </div>
        )
    }
}

export default Graph;