import io from 'socket.io-client';

// TODO env variable
const SOCKET_ENDPOINT = 'http://localhost:5000';

export default io(SOCKET_ENDPOINT);
