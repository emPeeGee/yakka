export type PickAnswerActivityType = {
  sentence: string;
  answer: string;
  options: { label: string; value: string; isCorrect: boolean }[];
};

export type TypeAnswerActivityType = {
  sentence: string;
  answer: string;
};

export type ActivityType = 'pickAnswer' | 'typeAnswer';
export type ActivityUnion = PickAnswerActivityType | TypeAnswerActivityType;

export type LessonActivity = {
  type: ActivityType;
  activity: PickAnswerActivityType | TypeAnswerActivityType;
};

export type ParsedLessonAnswers = { answers: Record<string, boolean>; elapsedSeconds: number };

export type LearningLessonStats = {
  time: number | string; // MM:SS
  balloons: number;
  experience: number;
  accuracy: number | string;
};
