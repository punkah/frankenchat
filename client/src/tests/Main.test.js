import { mount } from 'enzyme';
import * as React from 'react';
import Main from '../pages/Main';
import socket from '../socket';

it('receives message', () => {
  const setMessages = jest.fn();
  jest
    .spyOn(React, 'useState')
    .mockImplementation((message) => [message, setMessages]);

  jest.spyOn(socket, 'on').mockImplementation((event, callback) => {
    if (event === 'chat-message') {
      callback({
        username: 'foo',
        message: 'bar',
        timestamp: Date.now(),
      });
    }
  });

  mount(<Main />);

  expect(setMessages).toHaveBeenCalled();
});
