import { IIngredient } from "./types/types";

type TCookieProps = {
  expires: number
  expiresStr: string
  otherCookie: { [key: string]: string }
}

export function setCookie(name: string, value: string, props?: TCookieProps) {
  props = props || { expires: 60, expiresStr: '', otherCookie: {} };
  const d = new Date();
  d.setTime(d.getTime() + props.expires * 1000);
  props.expiresStr = d.toUTCString();

  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value + ';path=/';
  for (const propName in props.otherCookie) {
    updatedCookie += '; ' + propName;
    const propValue = props.otherCookie[propName];
    if (propValue) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function intersection(
  shortArr: string[],
  longArr: ReadonlyArray<IIngredient>) {
  const ingredientsArr = [];
  let bun = null;

  for (let i = 0; i < shortArr.length; i++) {
    const item = longArr.find(longArrItem =>
      longArrItem._id === shortArr[i]
    );
    if (!!item && item.type !== 'bun') {
      ingredientsArr.push(item);
    }
    if (!bun && !!item && item.type === 'bun') {
      bun = { ...item }
    }
  }
  return {
    bun,
    ingredientsArr,
  };
};

export const formatDate = (date: string) => {
  const orderDate = Number(
    date
      .split('T')[0]
      .split('-')[2]
      .split('')
      .filter((i) => i !== '0')
      .join('')
  );
  const orderTime = date.split('T')[1].split('.')[0].split(':', 2).join(':');
  const dateNow = new Date().getDate();
  const valueOfGMT = new Date().getTimezoneOffset() / 60;
  let prefixOfGmt = 'i-GMT'
  if (valueOfGMT < 0) {
    prefixOfGmt = prefixOfGmt + '+' + Math.abs(valueOfGMT);
  } else {
    prefixOfGmt = prefixOfGmt + Math.abs(valueOfGMT);
  }
  let formattedDate = '';

  if (orderDate === dateNow) {
    formattedDate = `Сегодня, ${orderTime} ${prefixOfGmt}`;
  }
  if (orderDate === dateNow - 1) {
    formattedDate = `Вчера, ${orderTime} ${prefixOfGmt}`;
  }
  if (orderDate < dateNow - 5) {
    formattedDate = `${dateNow - orderDate} дней назад, ${orderTime} ${prefixOfGmt}`;
  }
  if (orderDate < dateNow - 1) {
    formattedDate = `${dateNow - orderDate} дня назад, ${orderTime} ${prefixOfGmt}`;
  }

  return formattedDate;
};

export const selectItemsOfType = (
  itemType: string,
  arrayOfItems: ReadonlyArray<IIngredient>
) => {
  return arrayOfItems.reduce((acc: Array<IIngredient>, item) => {
    if (item.type === itemType) {
      acc.push(item);
    }
    return acc;
  }, []);
};

export const correctArr = (
  arr: ReadonlyArray<IIngredient>,
  prevIndex: number,
  newIndex: number
) => {
  const correctedArr: Array<IIngredient> = [...arr];
  correctedArr[prevIndex] = arr[newIndex];
  correctedArr[newIndex] = arr[prevIndex];
  return correctedArr;
};