import { CartItem } from 'services/client.interface';

function numberWithDot(x: number) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join('.');
}

export const sumUpTotalPrice = (carts: CartItem) => {
  if (!carts || !carts.length) {
    return 'Đang cập nhật';
  }

  const sum = carts
    .map(
      (item) =>
        parseInt(item?.price?.replace('.', ''), 10) * Number(item?.quantity)
    )
    .reduce((prevSum, currentValue) => prevSum + currentValue, 0);

  return `${numberWithDot(sum)}.000 VND`;
};
