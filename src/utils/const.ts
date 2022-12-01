export const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

export const OrderStatus = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
};

export const RequestStatus = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failed: 'failed',
};

export const ItemType = {
  Bun: {
    TYPE: "bun",
    NAME: "Булки",
  },
  Main: {
    TYPE: "main",
    NAME: "Начинки",
  },
  Sauce: {
    TYPE: "sauce",
    NAME: "Соусы",
  },
};