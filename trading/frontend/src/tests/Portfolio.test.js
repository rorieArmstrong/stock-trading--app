import React from 'react';
import ReactDOM from 'react-dom';
import Portfolio from '../components/pages/Portfolio';
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
        if (url == `https://finnhub.io/api/v1/quote?symbol=TSLA&token=brgc7g7rh5r8gtveo3hg`){
            return Promise.resolve({
                data:{c: 10}
            })
        }
        if (url == `https://finnhub.io/api/v1/quote?symbol=MSFT&token=brgc7g7rh5r8gtveo3hg`){
            return Promise.resolve({
                data:{c: 20}
            })
        }
    },
    patch: () => {
        return Promise.resolve({})
    },
    post: () => {
        return Promise.resolve({})
    },
    put: () => {
        return Promise.resolve({})
    },
    delete: () => {
        return Promise.resolve({})
    },
    
    defaults: { 
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: "X-CSRFTOKEN"
     }
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'prompt').mockImplementation(() => {return 1});
// jest.spyOn(window.locaton, 'reload').mockImplementation(() => {});
delete window.location;
window.location = { reload: jest.fn() };

describe('Portfolio', () => {
    const wrapper = shallow(<Portfolio />)
    const event = { preventDefault: jest.fn() };
    
    it('fetches prices from api', async () => {

    })

    it('buys a stock', async () => {
        (wrapper.find('[data-test="buyButton"]').at(1)).simulate('click', event);
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })

    it('sells a stock', async () => {
        (wrapper.find('[data-test="sellButton"]').at(1)).simulate('click', event);
        setTimeout(() => {
            expect(sell).toHaveBeenCalled()
        }, 4000)
    })

    it('sells all of a stock', async () => {
        (wrapper.find('[data-test="removeButton"]').at(1)).simulate('click', event);
        setTimeout(() => {
            expect(remove).toHaveBeenCalled()
        }, 4000)
    })

    it('puts if current === 0', () => {
        wrapper.instance().buy(87, 'MSFT', 0)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })

    it('cancels if amount > current', () => {
        wrapper.instance().sell(87, 'MSFT', 1000)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })

    it('deletes if amount == 0', () => {
        wrapper.instance().remove(87, 'MSFT', 0)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })

    it('cancels if you dont have enough funds', () => {
        wrapper.instance().buy(87, 'MSFT', 100)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })

    it('cancels if you dont have enough funds', () => {
        jest.spyOn(window, 'prompt').mockImplementation(() => {return 100000});
        wrapper.instance().buy(87, 'MSFT', 100)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })

    it('cancels if you dont buy any stocks', () => {
        jest.spyOn(window, 'prompt').mockImplementation(() => {return 100000});
        wrapper.instance().buy(null, 'MSFT', null)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    })
    
    it('does nothing if canceled', () => {
        jest.spyOn(window, 'prompt').mockImplementation(() => {return null});
        wrapper.instance().buy(87, 'MSFT', 0)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    }) 

    it('does nothing if canceled', () => {
        jest.spyOn(window, 'prompt').mockImplementation(() => {return 10000});
        wrapper.instance().sell(87, 'MSFT', 0)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    }) 

    it('does nothing if canceled', () => {
        jest.spyOn(window, 'prompt').mockImplementation(() => {return 0});
        wrapper.instance().sell(87, 'MSFT', 0)
        setTimeout(() => {
            expect(buy).toHaveBeenCalled()
        }, 4000)
    }) 
})