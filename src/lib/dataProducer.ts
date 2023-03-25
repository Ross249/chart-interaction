import { Data } from "@/types/data";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // [min,max)
}

export function producer(
  GroupSize: number,
  ItemSize: number,
  ValueMin: number,
  ValueMax: number
) {
  const data: Array<Data> = [];
  let index = 0;
  for (let i = 0; i < GroupSize; i++) {
    data.push({ id: i, name: "Category" + (i + 1), children: [] });
    for (let j = 0; j < ItemSize; j++) {
      data[i].children?.push({
        id: index++,
        name: "Item" + index,
        value: getRandomInt(ValueMin, ValueMax),
      });
    }
  }

  return data.map((ca, i) => {
    let sum = 0;
    ca.children?.map((it, i) => (sum += !!it.value ? it.value : 0));
    ca.value = sum;

    return ca;
  });
}
