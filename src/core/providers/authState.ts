import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// NOTE: the purpose of this state is to be able to access user inside other stores.

interface ExploreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialState: Pick<ExploreState, 'user'> = {
  user: null,
};

export const useAuthState = create<ExploreState>()(
  persist<ExploreState>(
    set => ({
      ...initialState,
      setUser: (user: User | null) => {
        set(() => ({
          user,
        }));
      },
    }),
    {
      name: 'auth-storage',
      // storage: createJSONStorage(() => AsyncStorage),
      // Store only these fields
      // partialize: state =>
      //   ({
      //   }) as ExploreState,
    },
  ),
);

// TODO: not the best location and file name
