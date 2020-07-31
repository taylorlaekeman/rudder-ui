export interface Goal {
  id: string;
  isAchieved: boolean;
  text: string;
}

export interface Sprint {
  endDate: string;
  id: string;
  goals: Goal[];
}
