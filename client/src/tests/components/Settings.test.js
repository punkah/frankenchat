import { shallow } from 'enzyme';
import * as React from 'react';
import Settings from '../../components/Settings';
import { Setting } from '../../types/constants';
import { ClockDisplay, Theme } from '../../types/enums';

jest.mock('socket.io-client');

describe('Settings', () => {
  it('changes theme correctly', () => {
    const getSetting = jest.fn().mockReturnValue(Theme.Dark);
    const setTheme = jest.fn();
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      getSetting,
      setTheme,
    }));

    const wrapper = shallow(<Settings />);
    const input = wrapper.find(`input[value='${Theme.Light}']`);
    input.simulate('change', { target: { value: Theme.Light } });

    expect(setTheme).toHaveBeenCalledWith(Theme.Light);
  });

  it('changes setting correctly', () => {
    const getSetting = jest.fn().mockReturnValue(ClockDisplay.Twelve);
    const setSetting = jest.fn();
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      getSetting,
      setSetting,
    }));

    const wrapper = shallow(<Settings />);
    const input = wrapper.find(`input[value='${ClockDisplay.TwentyFour}']`);
    input.simulate('change', {
      target: { value: ClockDisplay.TwentyFour, name: Setting.ClockDisplay },
    });

    expect(setSetting).toHaveBeenCalledWith(
      Setting.ClockDisplay,
      ClockDisplay.TwentyFour
    );
  });
});
