import { create } from 'zustand';

import { Word, WordCategory } from '@/types';
import vocabulary from '../../mocks/vocabulary.json';

const allWords = Object.values(vocabulary) as Word[];

interface VocabularyState {
  words: Word[];
  typedCategory: string;
  setTypedCategory: (category: string) => void;
  category: WordCategory;
  setCategory: (category: WordCategory) => void;
  favorites: Word[];
  setFavorites: (action: 'add' | 'delete', word: Word) => void;
}

export const useVocabularyStore = create<VocabularyState>()(set => ({
  words: allWords,
  category: 'all',
  typedCategory: '',
  setTypedCategory: (category: string) =>
    set(state => ({
      ...state,
      typedCategory: category,
    })),
  setCategory: category =>
    set(state => ({
      ...state,
      category,
      words:
        category === 'all'
          ? allWords.slice(-5)
          : allWords.filter(word => word.category === category),
    })),

  favorites: [],
  setFavorites: (action, word) => {
    switch (action) {
      case 'add':
        set(state => ({
          ...state,
          favorites: [...state.favorites, word],
        }));
        break;

      case 'delete':
        set(state => ({
          ...state,
          favorites: state.favorites.filter(w => w.word !== word.word),
        }));
        break;
    }
  },
}));

// TODO: not the best location and file name
