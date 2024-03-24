import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '@/api';
import { recursiveToCamel } from '@/core/utils';
import { Word, WordCategory } from '@/types';

// const allWords = Object.values(vocabulary) as Word[];
type Favorite = {
  id: number;
  word_id: number;
  liked: boolean;
  word: string;
  part_of_speech: string;
};

interface VocabularyState {
  words: Word[];
  category: WordCategory;
  typedCategory: string;
  favorites: Favorite[];
  setTypedCategory: (category: string) => void;
  setCategory: (category: WordCategory) => void;
  setFavorites: (action: 'add' | 'delete', favorite: Favorite, user: User) => void;
  reset: () => void;
  init: (user: User | null) => void;
}

const initialState: Pick<VocabularyState, 'words' | 'category' | 'favorites' | 'typedCategory'> = {
  words: [],
  category: 'all',
  typedCategory: '',
  favorites: [],
};

export const useVocabularyStore = create<VocabularyState>()(
  persist<VocabularyState>(
    set => ({
      ...initialState,
      init: async (user: User | null) => {
        if (!user) {
          return;
        }

        const { data: words, error: wordsError } = await supabase.from('words').select('*');
        const { data: liked, error: likedError } = await supabase
          .from('words_users')
          .select('id, word_id, liked, words!inner(word, part_of_speech)')
          .eq('user_id', user.id);

        console.log('word', liked, likedError);

        if (wordsError || likedError) {
          return;
        }

        set(state => ({
          ...state,
          words: [...(words?.map(w => recursiveToCamel(w)) as Word[])],
          favorites: liked?.map(l => ({
            id: l.id,
            word_id: l.word_id,
            liked: l.liked,
            word: l.words.word as string,
            part_of_speech: l.words.part_of_speech,
          })),
        }));
      },
      setTypedCategory: (category: string) =>
        set(state => ({
          ...state,
          typedCategory: category,
        })),
      setCategory: category =>
        set(state => ({
          ...state,
          category,
          // words:
          // category === 'all'
          //   ? allWords.slice(-5)
          //   : allWords.filter(word => word.category === category),
        })),
      setFavorites: async (action, favorite, user) => {
        switch (action) {
          case 'add':
            // eslint-disable-next-line no-case-declarations
            const { error: addError } = await supabase.from('words_users').upsert(
              {
                id: favorite.id,
                user_id: user.id,
                word_id: favorite.word_id,
                liked: true,
              },
              { onConflict: 'id' },
            );

            if (!addError) {
              set(state => ({
                ...state,
                favorites: [...state.favorites, favorite],
              }));
            }
            break;

          case 'delete':
            // eslint-disable-next-line no-case-declarations
            const { error: deleteError } = await supabase.from('words_users').upsert(
              {
                id: favorite.id,
                user_id: user.id,
                word_id: favorite.word_id,
                liked: false,
              },
              { onConflict: 'id' },
            );

            if (!deleteError) {
              set(state => ({
                ...state,
                favorites: state.favorites.map(f =>
                  favorite.id === f.id ? { ...f, liked: false } : f,
                ),
              }));
            }
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
      // partialize: state =>
      //   ({
      //     words: state.words,
      //     category: state.category,
      //     favorites: state.favorites,
      //   }) as VocabularyState,
    },
  ),
);

// TODO: not the best location and file name
