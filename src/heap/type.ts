export type element = {
  task: string;
  priority: number;
};

export type elements = Array<element>;

export type positionType = Map<number, Array<number>>;

export type compare = (a: number, b: number) => number;
