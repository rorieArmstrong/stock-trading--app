import React from 'react';
import ReactDOM from 'react-dom';
import Portfolio from '../components/pages/Portfolio';
import axios from 'axios';
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    get: (url) => {
        if (url == '/api/users'){
            return Promise.resolve({data: [{id: 1, balance: 10000}]})
        }
        if (url == '/api/stocks/?user=1'){
            return Promise.resolve({
                data: 
                    [
                        {"id":87,"stock_symbol":"MSFT","stocks_bought_number":0,"bought_at_price":"0.00","bought_at_time":"2020-06-11T11:24:31.491020Z","userID":1},
                        {"id":88,"stock_symbol":"TSLA","stocks_bought_number":0,"bought_at_price":"0.00","bought_at_time":"2020-06-11T11:24:39.285076Z","userID":1},
                        {"id":93,"stock_symbol":"MSFT","stocks_bought_number":9,"bought_at_price":"196.84","bought_at_time":"2020-06-11T11:36:41.716190Z","userID":1},
                        {"id":94,"stock_symbol":"TSLA","stocks_bought_number":7,"bought_at_price":"1025.05","bought_at_time":"2020-06-11T11:36:51.915921Z","userID":1}
                    ]
            })
        }
    }
    ,
    
    defaults: { 
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: "X-CSRFTOKEN"
     }
  }));


describe('Portfolio', () => {
    const wrapper = shallow(<Portfolio />)
    
    it('fetches prices from api', async () => {

    })

    it('buys a stock', async () => {

    })

    it('sells a stock', async () => {
        
    })

    it('sells all of a stock', async () => {
        
    })

    it('fetches the data', async () => {
        const getSpy = jest.spyOn(axios, 'get');
        const wrapper = shallow(<Portfolio />)
        expect(getSpy).toBeCalled();
    })

    it('loads a table', async () => {

    })

    it('calcuates the value of the portfolio', async () => {
        
        




    })

    it('renders', async () => {

    })

    it('creates the watchlist', async () => {
        
    })
})