import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { REGENERATE_INTERVAL_S } from '@/core/constants';
import { LearningLessonStats, Lesson, UserStats } from '@/types';
import {
  lesson0,
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
} from './lessons';

const lessons: Lesson[] = [
  lesson0,
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
];

interface LearnState {
  lessons: Lesson[];
  completed: string[];
  current: string;
  stats: UserStats;
  lastRegeneration: number;
  // setTypedCategory: (category: string) => void;
  setCompleted: (id: string, wonStats: LearningLessonStats) => void;
  regenerateLife: () => void;
  reset: () => void;
}

export const MAX_LIVES = 10;

const initialState: Pick<
  LearnState,
  'lessons' | 'completed' | 'current' | 'stats' | 'lastRegeneration'
> = {
  lessons: lessons,
  completed: [],
  current: lessons.at(0)?.id ?? '',
  stats: { balloons: 0, experience: 0, lives: MAX_LIVES },
  lastRegeneration: Date.now(),
};

console.log('at', lessons.at(0)?.id ?? '-1');

export const useLearnStore = create<LearnState>()(
  persist<LearnState>(
    set => ({
      ...initialState,
      setCompleted: (id: string, wonStats: LearningLessonStats) =>
        set(state => {
          const nextLesson = state.lessons.at(state.lessons.findIndex(l => l.id === id) + 1);

          console.log(nextLesson?.title, nextLesson?.id);

          return {
            ...state,
            completed: [...state.completed, id],
            current: nextLesson?.id,
            stats: {
              balloons: state.stats.balloons + wonStats.balloons,
              experience: state.stats.experience + wonStats.experience,
              lives: state.stats.lives - wonStats.livesUsed,
            },
          };
        }),
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
      partialize: state =>
        ({
          lessons: state.lessons,
          completed: state.completed,
          current: state.current,
          stats: state.stats,
          lastRegeneration: state.lastRegeneration,
        }) as LearnState,
    },
  ),
);
