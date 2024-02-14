export type Word = {
  word: string;
  wordset_id: string;
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
