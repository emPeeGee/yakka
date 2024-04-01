import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '@/api';
import { useAuthState } from '@/core/providers/authState';
import { Favorite, Word, WordCategory } from '@/types';

interface VocabularyState {
  words: Word[];
  category: WordCategory | null;
  categories: WordCategory[];
  typedCategory: string;
  favorites: Favorite[];
  isLoading: boolean;
  setTypedCategory: (category: string) => void;
  setCategory: (category: WordCategory) => void;
  setFavorites: (action: 'add' | 'delete', favorite: Favorite) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
  init: () => void;
}

const initialState: Pick<
  VocabularyState,
  'words' | 'category' | 'categories' | 'favorites' | 'typedCategory' | 'isLoading'
> = {
  words: [],
  category: null,
  categories: [],
  typedCategory: '',
  favorites: [],
  isLoading: true,
};

export const useVocabularyStore = create<VocabularyState>()(
  persist<VocabularyState>(
    set => ({
      ...initialState,
      init: async () => {
        const user = useAuthState.getState().user;
        if (!user) {
          return;
        }

        const { data: words, error: wordsError } = await supabase.rpc('get_random_words');
        const { data: liked, error: likedError } = await supabase
          .from('favorite_words')
          .select(
            'id, word_id, liked, words!inner(word, part_of_speech, definition, example, pronunciation)',
          )
          .eq('user_id', user.id);

        const { data: categories, error: categoriesError } = await supabase
          .from('word_categories')
          .select('*');

        console.log('word', words, categoriesError);

        if (wordsError || likedError) {
          return;
        }

        set(state => ({
          ...state,
          isLoading: false,
          words: [...(words?.map(w => ({ ...w })) as Word[])],
          categories: categories as WordCategory[],
          favorites: liked?.map(l => ({
            id: l.id,
            word_id: l.word_id,
            liked: l.liked,
            word: l.words.word,
            part_of_speech: l.words.part_of_speech,
            definition: l.words.definition,
            example: l.words.example,
            pronunciation: l.words.pronunciation,
          })),
        }));
      },
      setTypedCategory: (category: string) =>
        set(state => ({
          ...state,
          typedCategory: category,
        })),
      setCategory: async category => {
        let query;
        if (category.category_id === 1) {
          query = await supabase.rpc('get_random_words');
        } else {
          query = supabase
            .from('words')
            .select('*,  word_categories:category_id(category_id, category_name)')
            .eq('category_id', category.category_id);
        }

        const { data: wordsForCategory, error: wordsError } = await query;

        if (wordsError) {
          return;
        }

        set(state => ({
          ...state,
          category,
          words: [...wordsForCategory],
          isLoading: false,
        }));
      },
      setFavorites: async (action, favorite) => {
        const user = useAuthState.getState().user;
        switch (action) {
          case 'add':
            // eslint-disable-next-line no-case-declarations
            const { data: insertedWord, error: insertError } = await supabase
              .from('favorite_words')
              .upsert(
                {
                  id: favorite.id || undefined,
                  user_id: user.id,
                  word_id: favorite.word_id,
                  liked: true,
                },
                { onConflict: 'id' },
              )
              .select();

            if (!insertError) {
              set(state => ({
                ...state,
                favorites: [
                  ...state.favorites,
                  { ...favorite, id: insertedWord[0].id, liked: true },
                ],
              }));
            }
            break;

          case 'delete':
            // eslint-disable-next-line no-case-declarations
            const { error: deleteError } = await supabase.from('favorite_words').upsert(
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
      setIsLoading: (isLoading: boolean) => {
        set(state => ({
          ...state,
          isLoading,
        }));
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
