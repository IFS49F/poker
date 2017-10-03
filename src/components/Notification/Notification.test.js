import React from 'react';
import { shallow, mount } from 'enzyme';
import Notification from './Notification';

describe('<Notification />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<Notification />);
    });

    it('should render proper CSS class if `active` is `true`', () => {
      const wrapper = shallow(<Notification active={true} />);
      expect(wrapper.find('.Notification').hasClass('active')).toEqual(true);
    });

    it('should render offline tips', () => {
      const wrapper = shallow(<Notification reconnCountdown={5} />);
      expect(wrapper.contains(<span>Your seems offline, </span>)).toEqual(true);
      expect(wrapper.contains(<span className="countdown">we will try reconnecting in 5s... </span>)).toEqual(true);
    });

    it('should render reconnect link', () => {
      const wrapper = shallow(<Notification />);
      expect(wrapper.find('a').text()).toEqual('Reconnect Now');
    });
  });
});
