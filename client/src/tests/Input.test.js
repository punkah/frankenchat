import { shallow } from 'enzyme';
import * as React from 'react';
import Input from '../components/chat/Input';
import socket from '../socket';
import { SendMessageOnCtrlEnter } from '../types/enums';

describe('Input', () => {
  it('input change sets message value', () => {
    const setMessage = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation((message) => [message, setMessage]);
    const wrapper = shallow(<Input />);

    const input = wrapper.find('textarea');
    input.simulate('change', { target: { value: 'Hello' } });

    expect(setMessage).toHaveBeenCalledWith('Hello');
  });

  it('send message value when pressing enter', () => {
    const setMessage = jest.fn();
    const getSetting = jest.fn().mockReturnValue(SendMessageOnCtrlEnter.Off);
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => ['Hello', setMessage]);
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      getSetting,
    }));
    const wrapper = shallow(<Input />);

    const input = wrapper.find('textarea');
    input.simulate('keyPress', {
      key: 'Enter',
      ctrlKey: false,
      preventDefault: jest.fn(),
    });

    expect(socket.emit).toHaveBeenCalled();
  });
});
