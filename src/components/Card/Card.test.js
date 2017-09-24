import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('<Card />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<Card />);
    });

    it('should render 2 faces', () => {
      const wrapper = shallow(<Card />);
      expect(wrapper.find('.Card .face')).toHaveLength(2);
    });

    it('should render Card with proper CSS class if `voted` is `true`', () => {
      const wrapper = shallow(<Card voted={true} />);
      expect(wrapper.find('.Card').hasClass('voted')).toEqual(true);
    });

    it('should render Card with proper CSS class if `show` is `true`', () => {
      const wrapper = shallow(<Card show={true} />);
      expect(wrapper.find('.Card').hasClass('show')).toEqual(true);
    });

    it('should render Card with proper score', () => {
      let wrapper = shallow(<Card />);
      expect(wrapper.find('.front').text()).toEqual('');
      wrapper = shallow(<Card show={true} voted={true} score={13} />);
      expect(wrapper.find('.front').text()).toEqual('13');
    });
  });
});
