import React from 'react';
import { shallow, mount } from 'enzyme';
import Landing from './Landing';

describe('<Landing />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<Landing />);
    });

    it('should render Poker4Fun title', () => {
      const wrapper = shallow(<Landing />);
      expect(wrapper.contains(<h1>Poker4<strong>Fun</strong></h1>)).toEqual(true);
    });

    it('should render an input for typing room name', () => {
      const wrapper = shallow(<Landing />);
      expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });

    it('should render a button to Start or Join a session', () => {
      const wrapper = shallow(<Landing />);
      expect(wrapper.find('button[type="submit"]').text()).toEqual('Start or Join a session');
    });

    it('should render a link for the author of background picture', () => {
      const wrapper = shallow(<Landing />);
      expect(wrapper.find('.unsplash-credit a').text()).toEqual('Bram Naus');
    });
  });

  describe('Behaviors', () => {
    const history = {
      push: jest.fn()
    };
    const wrapper = mount(<Landing history={history} />);

    beforeEach(() => {
      wrapper.setState({ roomName: '' });
    });

    it('should get customized room name', () => {
      const form = wrapper.find('form');
      const input = wrapper.find('input[type="text"]');
      input.simulate('change', {
        target: {
          value: 'acl-grooming'
        }
      });
      form.simulate('submit');
      expect(history.push).toBeCalledWith('acl-grooming');
    });

    it('should get random room name if no customization', () => {
      const form = wrapper.find('form');
      form.simulate('submit');
      expect(history.push).toBeCalledWith(expect.anything());
    });
  });
});
