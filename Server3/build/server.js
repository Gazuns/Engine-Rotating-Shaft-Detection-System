import * as http from 'http';
import { serverHandle } from './app';
const PORT = 11451;
const server = http.createServer(serverHandle);
console.log(`Server is running on port ${PORT}`);
console.log('If you want to close the server, please input Ctrl+C');
server.listen(PORT);
