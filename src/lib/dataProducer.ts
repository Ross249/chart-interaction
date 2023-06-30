import { Data } from "@/types/data";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // [min,max]
}

export function producer(
  GroupSize: number,
  ItemSize: number,
  ValueMinX: number,
  ValueMaxX: number,
  ValueMinY: number,
  ValueMaxY: number
) {
  const data: Array<Data> = [];
  let index = 0;
  for (let i = 0; i < GroupSize; i++) {
    data.push({ id: i, name: "Category" + (i + 1), children: [] });
    for (let j = 0; j < ItemSize; j++) {
      data[i].children?.push({
        id: index++,
        name: "Item" + index,
        belong_group_id: i,
        valueX: getRandomInt(ValueMinX, ValueMaxX),
        valueY: getRandomInt(ValueMinY, ValueMaxY),
      });
    }
  }

  return data.map((ca, i) => {
    let sumX = 0,
      sumY = 0;
    ca.children?.map((it, i) => (sumX += !!it.valueX ? it.valueX : 0));
    ca.children?.map((it, i) => (sumY += !!it.valueY ? it.valueY : 0));
    ca.valueX = sumX;
    ca.valueY = sumY;

    return ca;
  });
}
