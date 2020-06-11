'use strict';
module.exports = {
    get: (url) => {
        if(url === '/api/users' ){
            return Promise.resolve({
                data: 
                    [
                        {"id":87,"stock_symbol":"MSFT","stocks_bought_number":0,"bought_at_price":"0.00","bought_at_time":"2020-06-11T11:24:31.491020Z","userID":1},
                        {"id":88,"stock_symbol":"TSLA","stocks_bought_number":0,"bought_at_price":"0.00","bought_at_time":"2020-06-11T11:24:39.285076Z","userID":1},
                        {"id":93,"stock_symbol":"MSFT","stocks_bought_number":9,"bought_at_price":"196.84","bought_at_time":"2020-06-11T11:36:41.716190Z","userID":1},
                        {"id":94,"stock_symbol":"TSLA","stocks_bought_number":7,"bought_at_price":"1025.05","bought_at_time":"2020-06-11T11:36:51.915921Z","userID":1}
                    ]  
            })
        if(url === ''){}
        }
    }
}