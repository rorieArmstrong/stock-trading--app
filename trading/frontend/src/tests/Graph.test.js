import React from 'react';
import ReactDOM from 'react-dom';
import Graph from '../components/pages/Graph';
import {shallow, configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    get: (url) => {
        if (url == '/api/users'){
            return Promise.resolve({data: [{id: 1, balance: 10000}]})
        }
        if(url == '/api/stock/?user=1'){
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
        if(url == '/api/stock/?user='){
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

describe('Graph.js is rendering: ', ()=>{
    it('renders without crashing', ()=>{
        const div=document.createElement('div');
        ReactDOM.render(<Graph />,div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has a watchlist of MSFT and TSLA', () => {
        let wrapper = mount(<Graph/>)
        setTimeout(() => {
            expect(wrapper.state('watchlist')).toEqual(['MSFT','TSLA'])
        }, 4000)
    })

    it('gets data from the api', () => {
        let wrapper = mount(<Graph/>)
        setTimeout(() => {
            expect(wrapper.state('watchlist')).toEqual(['MSFT','TSLA'])
        }, 5000)
    })

    it('gets watchlist from the api', () => {
        let wrapper = mount(<Graph/>)
        setTimeout(() => {
            expect(wrapper.state('userID')).toEqual(1)
            expect(wrapper.state('watchlist')).toEqual(['MSFT','TSLA'])
        }, 5000)
    })
})