import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/pages/Search';
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    get: (url) => {
        if (url == '/api/users'){
            return Promise.resolve({data: [{id: 1}]})
        }
    },

    post: (url) => {
        if (url == '/api/stocks/'){
            return Promise.resolve({data: [{id: 1}]})
        }
    },
    
    defaults: { 
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: "X-CSRFTOKEN"
     }
  }));

describe("Search", () => {
    const wrapper = shallow(<Search />)
    const event = { preventDefault: jest.fn() };

    beforeEach(() => {
        const wrapper = shallow(<Search />)
        const event = { preventDefault: jest.fn() };
    })

    it("handleChange should call setState on query", () => {
        const mockEvent = {
            target: {
                value:''
            }
        };
        const expected = {
           search:false,
           query:'',
           results:[],
           userID: 1,
           searched:''
        };
        wrapper.instance().handleChange(mockEvent);
        expect(wrapper.state()).toEqual(expected);
    }),

    it("should return array of data", () =>{
        wrapper.setState({query:"apple"})
        const expectedReturn = [
        {"name": "Apple Hospitality REIT, Inc.", "ticker": "APLE"}, 
        {"name": "Apple Inc.", "ticker": "AAPL"}, 
        {"name": "Maui Land & Pineapple Company, Inc.", "ticker": "MLP"}]
        wrapper.instance().getData(event)
        expect(wrapper.state("results")).toEqual(expectedReturn)
        expect(wrapper.state("search")).toEqual(true)
    })

    it('should search on submit of search', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        const addToWatchlist = jest.fn();
        wrapper.instance().addToWatchlist("APPL")
        setTimeout(() => {
            expect(addToWatchlist).toHaveBeenCalled()
        }, 4000)
    }) 

    it('should search on submit', () => {
        let wrapper = shallow(<Search />)
        wrapper.setState({query:"apple"})
        const expectedReturn = [
        {"name": "Apple Hospitality REIT, Inc.", "ticker": "APLE"}, 
        {"name": "Apple Inc.", "ticker": "AAPL"}, 
        {"name": "Maui Land & Pineapple Company, Inc.", "ticker": "MLP"}]
        expect(wrapper.find('form')).toHaveLength(1);
        wrapper.find('form').simulate('submit', event);
        setTimeout(() => {
            expect(wrapper.state("search")).toEqual(true)
            expect(wrapper.state("results")).toEqual(expectedReturn)
        }, 4000)
    })

    it('should search on resubmit', () => {
        wrapper.setState({query:"apple"})
        const expectedReturn = [
        {"name": "Apple Hospitality REIT, Inc.", "ticker": "APLE"}, 
        {"name": "Apple Inc.", "ticker": "AAPL"}, 
        {"name": "Maui Land & Pineapple Company, Inc.", "ticker": "MLP"}]
        expect(wrapper.find('form')).toHaveLength(1);
        wrapper.find('form').simulate('submit', event);
        expect(wrapper.state("search")).toEqual(true)
    })

    it('should add to watchlist on click', () => {
        (wrapper.find('#addButton').at(1)).simulate('click', event);
        setTimeout(() => {
            expect(addToWatchlist).toHaveBeenCalled()
        }, 4000)
    })

    it('should catch a bad response', () => {

    })
});

