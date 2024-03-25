import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '@/api';
import { REGENERATE_INTERVAL_S } from '@/core/constants';
import { LearningLessonStats, Lesson, UserStats } from '@/types';

interface LearnState {
  isLoading: boolean;
  lessons: Lesson[];
  completed: number[];
  current: number;
  stats: UserStats;
  lastRegeneration: number;
  init: (user: User | null) => void;
  setCompleted: (lesson_id: number, wonStats: LearningLessonStats, user: User) => void;
  regenerateLife: () => void;
  reset: () => void;
}

export const MAX_LIVES = 10;

const initialState: Pick<
  LearnState,
  'isLoading' | 'lessons' | 'completed' | 'current' | 'stats' | 'lastRegeneration'
> = {
  isLoading: true,
  lessons: [],
  completed: [],
  current: -1,
  stats: {
    balloons: 0,
    experience: 0,
    lives: MAX_LIVES,
    user_id: 0,
    created_at: '',
    updated_at: '',
  },
  lastRegeneration: Date.now(),
};

export const useLearnStore = create<LearnState>()(
  persist<LearnState>(
    set => ({
      ...initialState,
      init: async (user: User | null) => {
        if (!user) {
          return;
        }

        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('lesson_number', { ascending: true });
        const { data: completedLessons, error: completedLessonsError } = await supabase
          .from('user_lessons')
          .select('*, lessons!inner(lesson_number)')
          .eq('user_id', user.id)
          .order('lesson_number', { referencedTable: 'lessons', ascending: true });
        console.log('lessons', lessons, completedLessons);

        console.log('errors', lessonsError, completedLessonsError);
        console.log('completed', completedLessons?.map(l => l.lessons.lesson_number));

        if (lessonsError || completedLessonsError) {
          return;
        }

        const completed = completedLessons?.map(l => l.lessons.lesson_number);

        set(state => ({
          ...state,
          isLoading: false,
          lessons: [...lessons],
          completed,
          current: completed.at(-1) + 1, //  lessons.at(0).lesson_number,
        }));
      },
      setCompleted: async (lesson_id: number, wonStats: LearningLessonStats, user: User) => {
        const { error: completedError } = await supabase.from('user_lessons').upsert(
          {
            // TODO: need to pass user_lesson_id when doing the lesson second time, otherwise it will be created twice
            lesson_id: lesson_id,
            user_id: user.id,
            completed: true,
            completed_at: new Date().toISOString().toLocaleString('en-US'),
          },
          { onConflict: 'user_lesson_id' },
        );

        console.log(completedError);

        if (completedError) {
          return;
        }

        set(state => {
          const passedLesson = state.lessons.at(
            state.lessons.findIndex(l => l.lesson_id === lesson_id),
          ) as Lesson;
          const nextLesson = passedLesson?.lesson_number + 1;

          console.log('passed', passedLesson, nextLesson);

          return {
            ...state,
            completed: [...state.completed, passedLesson?.lesson_number],
            current: nextLesson,
            stats: {
              balloons: state.stats.balloons + wonStats.balloons,
              experience: state.stats.experience + wonStats.experience,
              lives: state.stats.lives - wonStats.livesUsed,
            },
          };
        });
      },
      regenerateLife: () =>
        set(state => {
          if (state.stats.lives >= MAX_LIVES) {
            return {
              ...state,
              lastRegeneration: Date.now(),
            };
          }

          const currentDate = Date.now();
          const startDate = state.lastRegeneration;
          const timeDiff = (currentDate - startDate) / 1000; //in ms
          const elapsedSeconds = Math.round(timeDiff);

          // TODO: elapsed seconds in two places

          if (elapsedSeconds > REGENERATE_INTERVAL_S) {
            // How many intervals we should restore when in background
            const canFillWith = Math.round(elapsedSeconds / REGENERATE_INTERVAL_S);

            return {
              ...state,
              lastRegeneration: Date.now(),
              stats: {
                ...state.stats,
                // Fill all the lives or make calculate diff between current life and canFillWith
                // eg. -4 + 8 = 4, Min(4, 10) = 4
                // -4 + 28 = 24, Min(24, 10) = 10
                lives: Math.min(state.stats.lives + canFillWith, MAX_LIVES),
              },
            };
          }

          return {
            ...state,
            lastRegeneration: Date.now(),
            stats: {
              ...state.stats,
              lives: state.stats.lives + 1,
            },
          };
        }),

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'learn-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Store only these fields
      // partialize: state =>
      //   ({
      //     lessons: state.lessons,
      //     completed: state.completed,
      //     current: state.current,
      //     stats: state.stats,
      //     lastRegeneration: state.lastRegeneration,
      //   }) as LearnState,
    },
  ),
);
