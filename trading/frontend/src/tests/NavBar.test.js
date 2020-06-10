import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from '../components/containers/NavBar';

describe('NavBar.js is rendering: ', ()=>{
    it('renders without crashing', ()=>{
        const div=document.createElement('div');
        ReactDOM.render(<Navigation />,div);
        ReactDOM.unmountComponentAtNode(div);
    });
})