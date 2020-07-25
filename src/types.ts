export interface GoalType {
  id: string;
  text: string;
}

export type Sprint = {
  endDate: string;
  id: string;
  goals: GoalType[];
};
