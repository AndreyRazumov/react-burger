import { Middleware, MiddlewareAPI } from "redux";
import { wsFeedActions } from "../store";
import { AppDispatch, RootState } from "../../utils/types";

const socketMiddleware = (
  wsUrl: string,
  wsActions: typeof wsFeedActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      // Закрытие соединения
      if (type === onClose) {
        socket && socket.close();
      }

      // Открытие соединения
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        // Ошибка соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        // Получение события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };
        // Закрытие соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    }
  }
}

export default socketMiddleware