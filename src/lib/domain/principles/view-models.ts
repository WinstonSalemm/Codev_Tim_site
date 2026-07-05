export type PrincipleCardVM = {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string;
  example: string;
};

export type PrinciplesPageVM = {
  protocols: PrincipleCardVM[];
  count: number;
};

export type LocalizedProtocolInput = {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string;
  example: string;
};
