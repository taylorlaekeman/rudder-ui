export interface Goal {
  id: string;
  text: string;
}

export interface Sprint {
  endDate: string;
  id: string;
  goals: Goal[];
}
