import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import Portfolio from "../components/pages/Portfolio"
import { MemoryRouter } from 'react-router';
import {mount, configure} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios'

configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
  get: {},
  
  defaults: { 
      withCredentials: true,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: "X-CSRFTOKEN"
   }
}));

describe('App.js is rendering: ', ()=>{
  it('renders without crashing', ()=>{
      const div=document.createElement('div');
      ReactDOM.render(<App />,div);
      ReactDOM.unmountComponentAtNode(div);
  });

/*   it('valid path should render component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/d' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(Portfolio)).toHaveLength(1);
  }); */
})
