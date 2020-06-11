import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/pages/Search';
import axios from 'axios';
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

    
        wrapper.instance().getData()
        expect(wrapper.state("results")).toEqual(expectedReturn)
        expect(wrapper.state("search")).toEqual(true)
    })

/*     it('should fetch a list of tasks', () => {
             wrapper.instance().addToWatchlist("APPL")
             .then(response => {
                console.log(response)
             })
    }) */
});

