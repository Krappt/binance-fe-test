import * as actions from './websocket';
import { WS_BASE, STREAM } from '../config';
import { updateData } from '../pages/App/actions';

const socketMiddleware = () => {
  let socket = null;

  const onOpen = (store) => (event) => {
    store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = (store) => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);

    switch (payload.stream) {
      case STREAM:
        store.dispatch(updateData(payload.data));
        break;
      default:
        break;
    }
  };

  return (store) => (next) => (action) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(`${WS_BASE}/${action.url}`);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      default:
        return next(action);
    }
    return null;
  };
};

export default socketMiddleware();
