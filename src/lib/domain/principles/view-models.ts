export type PrincipleCardVM = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type PrinciplesPageVM = {
  protocols: PrincipleCardVM[];
  count: number;
};
