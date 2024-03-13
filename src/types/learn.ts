export type ActivityType = 'pickAnswer';

export type PickAnswerActivityType = {
  type: ActivityType;
  sentence: string;
  answer: string;
  options: { label: string; value: string; isCorrect: boolean }[];
};

export type ParsedLessonAnswers = { answers: Record<string, boolean>; elapsedSeconds: number };

export type LearningLessonStats = {
  time: number | string; // MM:SS
  balloons: number;
  experience: number;
  accuracy: number | string;
};
