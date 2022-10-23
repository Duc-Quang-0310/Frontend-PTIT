import { Laptop } from 'services/client.interface';

export const handleCheckSearchValueInRecord = (
  data: Laptop[],
  search: string
) => {
  const splitSearchValue: string[] = [];

  for (const word of search) {
    splitSearchValue.push(word);
  }

  const searchedArr = data.map((laptop) => {
    let matchCase = 0;

    splitSearchValue.forEach((word) => {
      if (laptop.productName.toLowerCase().includes(word)) {
        matchCase += 1;
      }
    });

    if (matchCase === splitSearchValue.length) {
      return laptop;
    }
    return undefined;
  });

  return searchedArr.length
    ? searchedArr.filter((each) => typeof each === 'object')
    : [];
};
