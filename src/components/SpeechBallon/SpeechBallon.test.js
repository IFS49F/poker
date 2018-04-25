import React from 'react';
import { shallow } from 'enzyme';
import SpeechBallon from './SpeechBallon';

describe('<SpeechBallon />', () => {
  describe('Structures', () => {
    it('should render without crashing', () => {
      shallow(<SpeechBallon />);
    });

    it('should render a blockquote with correct class names', () => {
      const wrapper = shallow(<SpeechBallon color="green" />);
      expect(wrapper.find('.SpeechBallon').hasClass('green')).toEqual(true);
    });
  });
});
