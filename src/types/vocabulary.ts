export type WordCategory =
  | 'all'
  | 'animals1'
  | 'colors1'
  | 'colors2'
  | 'shapes1'
  | 'actions1'
  | 'actions2'
  | 'vegetables1'
  | 'transport1'
  | 'pets1'
  | 'weather1';

export type Word = {
  word: string;
  category: WordCategory;
  wordset_id: string;
  pronunciation?: string;
  meanings: WordMeaning[];
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

export type WordMeaning = {
  id: string;
  def: string;
  example?: string;
  speech_part: SpeechPart;
  synonyms?: string[];
  labels?: WordLabel[];
};

export type WordLabel = {
  name: string;
  is_dialect: boolean;
  parent: {
    name: string;
    is_dialect: boolean;
  };
};
