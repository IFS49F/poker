import React from 'react';
import { shallow, mount } from 'enzyme';
import Summary from './Summary';

describe('<Summary />', () => {
  describe('Structures', () => {
    let me;
    let team;

    beforeEach(() => {
      me = {
        id: 1,
        name: 'just4fun',
        score: 8,
        voted: true
      };
      team = [
        {
          id: 2,
          name: 'frank',
          score: 5,
          voted: true
        },
        {
          id: 3,
          name: 'hyjk2000',
          score: 13,
          voted: true
        },
        {
          id: 4,
          name: 'hiveer',
          score: 5,
          voted: true
        },
        {
          id: 5,
          name: 'teresa',
          score: null,
          voted: false
        }
      ];
    });

    it('should render without crashing', () => {
      shallow(<Summary />);
    });

    it('should render an empty <div> with proper CSS class if `show` if false', () => {
      const wrapper = shallow(<Summary show={false} />);
      expect(wrapper.contains(<div className="Summary"></div>)).toEqual(true);
    });

    it('should sort the scores from smallest to largest', () => {
      const wrapper = shallow(<Summary me={me} team={team} show={true} />);
      expect(wrapper.find('.Summary ul').childAt(0).find('dd').text()).toEqual('5');
      expect(wrapper.find('.Summary ul').childAt(1).find('dd').text()).toEqual('8');
      expect(wrapper.find('.Summary ul').childAt(2).find('dd').text()).toEqual('13');
    });

    it('should render correct scores distribution', () => {
      const wrapper = shallow(<Summary me={me} team={team} show={true} />);
      expect(wrapper.find('.Summary ul').childAt(0).find('dt').text()).toEqual('× 2');
      expect(wrapper.find('.Summary ul').childAt(1).find('dt').text()).toEqual('× 1');
      expect(wrapper.find('.Summary ul').childAt(2).find('dt').text()).toEqual('× 1');
    });
  });
});
