import React from 'react';
import { shallow, mount } from 'enzyme';
import Join from './Join';

describe('<Join />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<Join />);
    });

    it('should render an input field', () => {
      const wrapper = shallow(<Join />);
      expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });

    it('should render a Play button', () => {
      const wrapper = shallow(<Join />);
      expect(wrapper.find('button[type="submit"]').text()).toEqual('Play');
    });
  });

  describe('Behaviors', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Join onSubmit={onSubmit} playerName={''} />);

    it('should call `onSubmit` if submit form', () => {
      const form = wrapper.find('form');
      const input = wrapper.find('input[type="text"]');
      input.simulate('change', {
        target: {
          name: 'myName',
          value: 'just4fun'
        }
      });
      form.simulate('submit');
      expect(onSubmit).toBeCalledWith('just4fun');
    });
  });
});
