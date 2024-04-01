import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '@/api';
import { useAuthState } from '@/core/providers/authState';
import { Explore, ExploreTopic, ExploreUser } from '@/types';

interface ExploreState {
  topics: ExploreTopic[];
  exploreItems: Explore[];
  exploreUsers: ExploreUser[];
  isLoading: boolean;
  init: (user: User | null) => void;
  setExploreUsers: (action: 'add' | 'delete', favorite: ExploreUser) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState: Pick<ExploreState, 'topics' | 'exploreItems' | 'exploreUsers' | 'isLoading'> = {
  topics: [],
  exploreUsers: [],
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
        const { data: likedExplore, error: likedExploreError } = await supabase
          .from('explore_users')
          .select(
            'explore_user_id, explore_id, liked, explore!inner(explore_id, lesson_name, description, emoji, lesson_content)',
          )
          .eq('user_id', user.id);
        console.log('exp_users', likedExplore, likedExploreError, topicsError);

        if (topicsError || likedExploreError) {
          return;
        }

        set(state => ({
          ...state,
          isLoading: false,
          topics: [...(topics?.map(w => w) as ExploreTopic[])],
          exploreUsers: [...likedExplore] as ExploreUser[],
        }));
      },
      setExploreUsers: async (action, expUser) => {
        const user = useAuthState.getState().user;
        switch (action) {
          case 'add':
            // eslint-disable-next-line no-case-declarations
            const { data: insertedWord, error: insertError } = await supabase
              .from('explore_users')
              .upsert(
                {
                  explore_user_id: expUser.explore_user_id || undefined,
                  user_id: user?.id,
                  explore_id: expUser.explore_id,
                  liked: true,
                },
                { onConflict: 'explore_user_id' },
              )
              .select();

            console.log(expUser, insertError, insertedWord);

            if (!insertError) {
              set(state => {
                const newExpUser = {
                  ...expUser,
                  explore_user_id: insertedWord[0].explore_user_id,
                  liked: true,
                };
                const i = state.exploreUsers.findIndex(function (eu) {
                  return eu.explore_user_id == expUser.explore_user_id;
                });

                // replace the current one if it exists or append it
                if (i !== -1) {
                  return {
                    ...state,
                    exploreUsers: state.exploreUsers.map(eu =>
                      eu.explore_user_id === expUser.explore_user_id ? newExpUser : eu,
                    ),
                  };
                } else {
                  return {
                    ...state,
                    exploreUsers: [...state.exploreUsers, newExpUser],
                  };
                }
              });
            }
            break;

          case 'delete':
            // eslint-disable-next-line no-case-declarations
            const { error: deleteError } = await supabase.from('explore_users').upsert(
              {
                explore_user_id: expUser.explore_user_id,
                explore_id: expUser.explore_id,
                user_id: user?.id,
                liked: false,
              },
              { onConflict: 'explore_user_id' },
            );
            console.log(expUser, deleteError);

            if (!deleteError) {
              set(state => ({
                ...state,
                exploreUsers: state.exploreUsers.map(eu =>
                  expUser.explore_user_id === eu.explore_user_id ? { ...eu, liked: false } : eu,
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
