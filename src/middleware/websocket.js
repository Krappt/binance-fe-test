export const wsConnect = (url) => ({ type: 'WS_CONNECT', url });
export const wsConnecting = () => ({ type: 'WS_CONNECTING' });
export const wsConnected = () => ({ type: 'WS_CONNECTED' });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsDisconnected = () => ({ type: 'WS_DISCONNECTED' });
