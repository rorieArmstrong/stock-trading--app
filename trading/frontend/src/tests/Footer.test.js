import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/containers/Footer';
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Footer', () =>{
    it('should render a div', () => {
        let wrapper = shallow(<Footer/>)
        expect(wrapper.find('div').length).toEqual(1);
    })
})