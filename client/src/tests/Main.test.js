import { mount } from 'enzyme';
import * as React from 'react';
import Main from '../pages/Main';

jest.mock('socket.io-client', () => () => ({
  on: jest.fn((event, callback) => {
    if (event === 'chat-message') {
      callback({
        username: 'foo',
        message: 'bar',
        timestamp: Date.now(),
      });
    }
  }),
}));

describe('Main', () => {
  it('receives message', () => {
    const setMessages = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation((message) => [message, setMessages]);

    mount(<Main />);

    expect(setMessages).toHaveBeenCalled();
  });
});
