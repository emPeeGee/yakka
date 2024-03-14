export type PickAnswerActivityType = {
  sentence: string;
  answer: string;
  options: { label: string; value: string; isCorrect: boolean }[];
};

export type TypeAnswerActivityType = {
  sentence: string;
  answer: string;
};

export type DragWordsActivityType = {
  sentence: string;
  answer: string;
  options: string[];
};

export type MissingWordActivityType = {
  sentence: string;
  answer: string;
  options: { label: string; value: string }[];
};

export type MatchingPairsActivityType = {
  // sentence will behave as an ID for this activity
  sentence: string;
  // answer: string;
  answers: string[][];
  // options: { label: string; value: string; isCorrect: boolean }[];
};

export type ActivityType =
  | 'pickAnswer'
  | 'typeAnswer'
  | 'dragWords'
  | 'missingWord'
  | 'matchingPairs';

export type ActivityUnion =
  | PickAnswerActivityType
  | TypeAnswerActivityType
  | DragWordsActivityType
  | MissingWordActivityType
  | MatchingPairsActivityType;

export type LessonActivity = {
  type: ActivityType;
  activity: ActivityUnion;
};

export type ParsedLessonAnswers = { answers: Record<string, boolean>; elapsedSeconds: number };

export type LearningLessonStats = {
  time: number | string; // MM:SS
  balloons: number;
  experience: number;
  accuracy: number | string;
};
