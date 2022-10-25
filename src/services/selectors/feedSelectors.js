export const getOrders = store => store.wsFeedReducer.orders || undefined;
export const getTotal = store => store.wsFeedReducer.total || 0;
export const getTotalToday = store => store.wsFeedReducer.totalToday || 0;
export const getWsFeedConnected = state => state.wsFeedReducer.wsFeedConnection;
