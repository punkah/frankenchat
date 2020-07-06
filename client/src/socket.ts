import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://localhost:5000';

export default io(SOCKET_ENDPOINT);
