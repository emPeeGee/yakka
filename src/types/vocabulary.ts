export type WordCategory = {
  category_id: number;
  category_name: string;
  emoji: string;
};

export type Word = {
  word_id: number;
  favorite_id?: number;
  word: string;
  word_categories?: WordCategory | null;
  category_id: null;
  pronunciation: string;
  synonyms?: string[];
  definition: string;
  example?: null;
  part_of_speech: string;
  created_at?: string;
};

export type Favorite = {
  id: number;
  word_id: number;
  liked: boolean;
  word: string;
  part_of_speech: string;
};

export type SpeechPart =
  | 'adverb'
  | 'adjective'
  | 'noun'
  | 'verb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection';
