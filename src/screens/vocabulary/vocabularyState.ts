import { create } from 'zustand';

import { Word, WordCategory } from '@/types';
import vocabulary from '../../mocks/vocabulary.json';

const allWords = Object.values(vocabulary) as Word[];

interface VocabularyState {
  words: Word[];
  category: WordCategory;
  setCategory: (category: WordCategory) => void;
}

export const useVocabularyStore = create<VocabularyState>()(set => ({
  words: allWords,
  category: 'all',
  setCategory: category =>
    set(() => ({
      category,
      words:
        category === 'all'
          ? allWords.slice(-5)
          : allWords.filter(word => word.category === category),
    })),
}));

// TODO: not the best location and file name
