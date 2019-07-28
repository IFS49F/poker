import React from 'react';
import { shallow } from 'enzyme';
import Actions from './Actions';

describe('<Actions />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<Actions />);
    });

    it('should render 14 buttons for valid scores', () => {
      const wrapper = shallow(<Actions />);
      expect(wrapper.find('.scores button')).toHaveLength(14);
    });

    it('should know which score has been voted', () => {
      const wrapper = shallow(<Actions myScore={'8'} />);
      expect(wrapper.find('.scores button.selected').text()).toEqual('8');
    });

    it('should render a `Show` button when `show` is `false`', () => {
      const wrapper = shallow(<Actions show={false} />);
      expect(wrapper.find('.operations button').text()).toEqual('Show');
    });

    it('should render a `Clear` button with proper CSS class when `show` is `false`', () => {
      const wrapper = shallow(<Actions show={true} />);
      expect(wrapper.find('.operations button').text()).toEqual('Clear');
      expect(wrapper.find('.operations button').hasClass('danger')).toEqual(true);
    });
  });
});
