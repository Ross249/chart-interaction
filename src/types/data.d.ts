export type Data = {
  id: number;
  name: string;
  children?: Data[];
  belong_group_id?: number;
  valueX?: number;
  valueY?: number;
};

export type IState = {
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
};

export type Node = Data & {
  _x: number;
  _y: number;
};
