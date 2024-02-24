import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Word, WordCategory } from '@/types';
import vocabulary from '../../mocks/vocabulary.json';

const allWords = Object.values(vocabulary) as Word[];

interface VocabularyState {
  words: Word[];
  category: WordCategory;
  typedCategory: string;
  favorites: Word[];
  setTypedCategory: (category: string) => void;
  setCategory: (category: WordCategory) => void;
  setFavorites: (action: 'add' | 'delete', word: Word) => void;
  reset: () => void;
}

const initialState: Pick<VocabularyState, 'words' | 'category' | 'favorites' | 'typedCategory'> = {
  words: allWords,
  category: 'all',
  typedCategory: '',
  favorites: [],
};

export const useVocabularyStore = create<VocabularyState>()(
  persist<VocabularyState>(
    set => ({
      ...initialState,
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

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Store only these fields
      partialize: state =>
        ({
          words: state.words,
          category: state.category,
          favorites: state.favorites,
        }) as VocabularyState,
    },
  ),
);

// TODO: not the best location and file name
