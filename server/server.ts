import {initializeServer} from './server-app';
import './endpoints/get-activities';

const serverApp = initializeServer();

export type ServerApp = typeof serverApp;

serverApp.listen(3000, () => {});
