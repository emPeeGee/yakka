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
  answers: string[][];
};

export type ListeningActivityType = {
  sentence: string;
  answer: string;
  options: string[];
};

export type ActivityType =
  | 'pickAnswer'
  | 'typeAnswer'
  | 'dragWords'
  | 'missingWord'
  | 'matchingPairs'
  | 'listening';

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

export type Lesson = {
  lesson_number: number;
  created_at: string;
  lesson_id: number;
  title: string;
  description: string;
  activities: LessonActivity[];
};

export type UserLesson = {
  user_lesson_id: number;
  user_id: number;
  lesson_id: number;
  completed: boolean;
  completed_at: string;
  created_at: string;
};

export type UserStatistics = {
  user_id: number;
  balloons: number;
  experience: number;
  lives: number;
  created_at: string;
  updated_at: string;
};

export type ParsedLessonAnswers = { answers: Record<string, boolean>; elapsedSeconds: number };

export type LearningLessonStats = {
  time: number | string; // MM:SS
  balloons: number;
  experience: number;
  accuracy: number | string;
  livesUsed: number;
};
