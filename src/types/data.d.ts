export type Data = {
  id: number;
  name: string;
  children?: Data[];
  value?: number;
};

export type IState = {
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
};
