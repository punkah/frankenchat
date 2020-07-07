# frankenchat

## 1. Running the app

Start by runnning `yarn` and then `yarn dev` from the root directory.

This will automatically open a browser window at http://localhost:8080. If you open the same url in another window, you can start chatting to yourself.

## 2. Features

- [x] Chat page - send & receive messages

- [x] Settings

  - [x] User name - default is socket.id
  - [x] Interface color - default is system theme
  - [x] Clock display - default 12h
  - [x] Send messages on CTRL+ENTER: default is off. When it's turned on the user can type multiline messages.

- [x] React Context is used for state management (Theme and Settings).
- [x] If user is not in the Chat tab, Chat tab starts blinking with unread count until user clicks on it.
- [x] The view is scrolled to the end of the messages when switching to the Chat tab or when the view is scrolled back up by the user previously and a new message is received.
- [x] Stored messages are loaded from the server upon reconnecting
- [x] Multi-browser support achieved by using postcss webpack plugin
- [x] Test coverage: ~86% of lines
