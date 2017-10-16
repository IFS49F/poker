import React from 'react';
import { shallow, mount } from 'enzyme';
import Votes from './Votes';

describe('<Votes />', () => {
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
      shallow(<Votes team={team} />);
    });

    it('should render correct numbers of card', () => {
      const wrapper = shallow(<Votes me={me} team={team} show={true} />);
      expect(wrapper.find('Card')).toHaveLength(5);
    });

    it('should render `me` as the first card', () => {
      const wrapper = shallow(<Votes me={me} team={team} show={true} />);
      expect(wrapper.find('.Votes ul').childAt(0).find('dt').text()).toEqual('just4fun');
    });

    it('should sort other player names alphabetically', () => {
      const wrapper = shallow(<Votes me={me} team={team} show={true} />);
      expect(wrapper.find('.Votes ul').childAt(1).find('dt').text()).toEqual('frank');
      expect(wrapper.find('.Votes ul').childAt(2).find('dt').text()).toEqual('hiveer');
      expect(wrapper.find('.Votes ul').childAt(3).find('dt').text()).toEqual('hyjk2000');
      expect(wrapper.find('.Votes ul').childAt(4).find('dt').text()).toEqual('teresa');
    });
  });
});
