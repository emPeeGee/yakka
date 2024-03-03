export type ActivityType = 'pickAnswer';

export type PickAnswerActivityType = {
  type: ActivityType;
  sentence: string;
  answer: string;
  options: { label: string; value: string; isCorrect: boolean }[];
};
