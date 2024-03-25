import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '@/api';
import { Explore, ExploreTopic } from '@/types';

interface ExploreState {
  topics: ExploreTopic[];
  exploreItems: Explore[];
  // favorites: Favorite[];
  isLoading: boolean;
  init: (user: User | null) => void;
  // setFavorites: (action: 'add' | 'delete', favorite: Favorite, user: User) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState: Pick<ExploreState, 'topics' | 'exploreItems' | 'isLoading'> = {
  topics: [],
  exploreItems: [],
  isLoading: true,
};

export const useExploreStore = create<ExploreState>()(
  persist<ExploreState>(
    set => ({
      ...initialState,
      init: async (user: User | null) => {
        if (!user) {
          return;
        }

        const { data: topics, error: topicsError } = await supabase.from('topics').select('*');

        if (topicsError) {
          return;
        }

        set(state => ({
          ...state,
          isLoading: false,
          topics: [...(topics?.map(w => w) as ExploreTopic[])],
          // categories: categories as WordCategory[],
          // favorites: topics?.map(l => ({
          //   id: l.id,
          //   word_id: l.word_id,
          //   liked: l.liked,
          //   word: l.words.word,
          //   part_of_speech: l.words.part_of_speech,
          //   definition: l.words.definition,
          //   example: l.words.example,
          //   pronunciation: l.words.pronunciation,
          // })),
        }));
      },
      // setFavorites: async (action, favorite, user) => {
      //   switch (action) {
      //     case 'add':
      //       // eslint-disable-next-line no-case-declarations
      //       const { error: addError } = await supabase.from('favorite_words').upsert(
      //         {
      //           id: favorite.id,
      //           user_id: user.id,
      //           word_id: favorite.word_id,
      //           liked: true,
      //         },
      //         { onConflict: 'id' },
      //       );

      //       if (!addError) {
      //         set(state => ({
      //           ...state,
      //           favorites: [...state.favorites, favorite],
      //         }));
      //       }
      //       break;

      //     case 'delete':
      //       // eslint-disable-next-line no-case-declarations
      //       const { error: deleteError } = await supabase.from('favorite_words').upsert(
      //         {
      //           id: favorite.id,
      //           user_id: user.id,
      //           word_id: favorite.word_id,
      //           liked: false,
      //         },
      //         { onConflict: 'id' },
      //       );

      //       if (!deleteError) {
      //         set(state => ({
      //           ...state,
      //           favorites: state.favorites.map(f =>
      //             favorite.id === f.id ? { ...f, liked: false } : f,
      //           ),
      //         }));
      //       }
      //       break;
      //   }
      // },
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
      name: 'explore-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Store only these fields
      // partialize: state =>
      //   ({
      //     words: state.words,
      //     category: state.category,
      //     favorites: state.favorites,
      //   }) as ExploreState,
    },
  ),
);

// TODO: not the best location and file name
