import React from 'react';
import { shallow, mount } from 'enzyme';
import Share from './Share';

describe('<Share />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<Share />);
    });

    it('should render Poker4Fun title', () => {
      const wrapper = shallow(<Share />);
      expect(wrapper.contains(<h1>Poker4<strong>Fun</strong></h1>)).toEqual(true);
    });

    it('should render a link to click for copy', () => {
      const wrapper = shallow(<Share roomName={'acl-grooming'} />);
      expect(wrapper.find('a').text()).toEqual(expect.stringContaining('/acl-grooming'));
    });
  });

  describe('Behaviors', () => {
    const wrapper = mount(<Share />);
    const link = wrapper.find('a');

    document.execCommand = jest.fn();

    it('should set tooltip to `Copied!` once clicked link', () => {
      link.simulate('click');
      expect(wrapper.state().tooltip).toEqual('Copied!');
    });

    it('should set tooltip to default once mouse left', () => {
      link.simulate('mouseleave');
      expect(wrapper.state().tooltip).toEqual('Click to copy link');
    });
  });
});
