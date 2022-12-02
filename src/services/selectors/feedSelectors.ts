import { RootState } from "../../utils/types";

export const getOrders = (store: RootState) => store.wsFeedReducer.orders || undefined;
export const getTotal = (store: RootState) => store.wsFeedReducer.total || 0;
export const getTotalToday = (store: RootState) => store.wsFeedReducer.totalToday || 0;
export const getWsFeedConnected = (state: RootState) => state.wsFeedReducer.wsFeedConnection;
