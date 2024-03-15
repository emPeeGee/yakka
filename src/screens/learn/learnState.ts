import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  DragWordsActivityType,
  LearningLessonStats,
  Lesson,
  ListeningActivityType,
  MatchingPairsActivityType,
  MissingWordActivityType,
  PickAnswerActivityType,
  TypeAnswerActivityType,
  UserStats,
} from '@/types';

const firstLessonDemo: Lesson = {
  id: '0',
  title: 'Introduction to Learning English',
  description:
    'Lesson 1. This lesson is designed for Romanian speakers who are beginning to learn English.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'His name is Andrew',
        answer: 'Numele lui este Andrew',
        options: ['Numele lui este Andrew', 'Numele meu este Andrew', 'Numele tau este Andre'],
      } as ListeningActivityType,
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'My name @@@ Ken',
        answer: 'is',
        options: [
          { label: 'are', value: 'are' },
          { label: 'as', value: 'as' },
          { label: 'is', value: 'is' },
        ],
      } as MissingWordActivityType,
    },
  ],
};

const firstLesson: Lesson = {
  id: '1',
  title: 'Introduction to Learning English',
  description:
    'Lesson 1. This lesson is designed for Romanian speakers who are beginning to learn English.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'His name is Andrew',
        answer: 'Numele lui este Andrew',
        options: ['Numele lui este Andrew', 'Numele meu este Andrew', 'Numele tau este Andre'],
      } as ListeningActivityType,
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'People',
        answers: [
          ['Barbat', 'Man'],
          // ['Barbati', 'Men'],
          // ['Baiat', 'Boy'],
          // ['Fata', 'Girl'],
          ['Femeie', 'Woman'],
        ],
      } as MatchingPairsActivityType,
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'My name @@@ Ken',
        answer: 'is',
        options: [
          { label: 'are', value: 'are' },
          { label: 'as', value: 'as' },
          { label: 'is', value: 'is' },
        ],
      } as MissingWordActivityType,
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'Ma numesc Ken',
        answer: 'My name is Ken',
        options: ['Ken', 'my', 'hello', 'is', 'hello', 'name', 'an', 'a'],
      } as DragWordsActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'The boy is reading',
        answer: 'Baiatul citeste acum',
        options: [
          { label: 'Baiatul mananca acum', value: 'Baiatul mananca acum', isCorrect: false },
          { label: 'Baiatul scrie acum', value: 'Baiatul scrie acum', isCorrect: false },
          { label: 'Baiatul citeste acum', value: 'Baiatul citeste acum', isCorrect: true },
        ],
      } as PickAnswerActivityType,
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'My name is Ken',
        answer: 'Numele meu este Ken',
      } as TypeAnswerActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'An apple',
        answer: 'Un măr',
        options: [
          { label: 'Un măr', value: 'Un măr', isCorrect: true },
          { label: 'Un băiat', value: 'Un băiat', isCorrect: false },
          { label: 'O coacăză', value: 'O coacăză', isCorrect: false },
        ],
      } as PickAnswerActivityType,
    },
  ],
};

const greetingsLesson: Lesson = {
  id: '2',
  title: 'Greetings and Introductions',
  description:
    'This lesson focuses on basic greetings and introductions in English for Romanian speakers who are beginners.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'Hello, how are you?',
        answer: 'Bună, cum ești?',
        options: ['Bună, cum ești?', 'Salut, ce faci?', 'Bună, ce mai faci?'],
      } as ListeningActivityType,
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the greeting with its meaning:',
        answers: [
          ['Hi', 'Salut'],
          ['Good morning', 'Bună dimineața'],
          ['Good afternoon', 'Bună ziua'],
          ['Good evening', 'Bună seara'],
        ],
      } as MatchingPairsActivityType,
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'Nice to @@@ you.',
        answer: 'meet',
        options: [
          { label: 'see', value: 'see' },
          { label: 'meet', value: 'meet' },
          { label: 'know', value: 'know' },
        ],
      } as MissingWordActivityType,
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'My name is Maria.',
        answer: 'Numele meu este Maria.',
        options: ['Maria', 'name', 'is', 'my', 'hello'],
      } as DragWordsActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: "What's your name?",
        answer: 'Cum te numești?',
        options: [
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
          { label: 'Cum te numești?', value: 'Cum te numești?', isCorrect: true },
          { label: 'Cât timp faci sport?', value: 'Cât timp faci sport?', isCorrect: false },
        ],
      } as PickAnswerActivityType,
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: "I'm fine, thank you.",
        answer: 'Sunt bine, mulțumesc.',
      } as TypeAnswerActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'How old are you?',
        answer: 'Câți ani ai?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: false },
          { label: 'Câți ani ai?', value: 'Câți ani ai?', isCorrect: true },
          { label: 'Unde locuiești?', value: 'Unde locuiești?', isCorrect: false },
        ],
      } as PickAnswerActivityType,
    },
  ],
};

const everydayActivitiesLesson: Lesson = {
  id: '3',
  title: 'Everyday Activities',
  description:
    'This lesson covers common everyday activities in English for beginners who are Romanian speakers.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'I brush my teeth every morning.',
        answer: 'Îmi spăl dinții în fiecare dimineață.',
        options: [
          'Îmi spăl dinții în fiecare dimineață.',
          'Îmi aranjez părul în fiecare seară.',
          'Îmi fac patul în fiecare după-amiază.',
        ],
      } as ListeningActivityType,
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the activity with its meaning:',
        answers: [
          ['Cooking', 'Gătit'],
          ['Cleaning', 'Curățenie'],
          ['Shopping', 'Cumpărături'],
          ['Exercising', 'Exercițiu'],
        ],
      } as MatchingPairsActivityType,
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I like to @@@ books in the evening.',
        answer: 'read',
        options: [
          { label: 'watch', value: 'watch' },
          { label: 'listen', value: 'listen' },
          { label: 'read', value: 'read' },
        ],
      } as MissingWordActivityType,
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'I take a shower every day.',
        answer: 'Mă spăl pe cap în fiecare zi.',
        options: ['Mă', 'spăl', 'pe', 'cap', 'în', 'fiecare', 'zi.'],
      } as DragWordsActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What do you do in the morning?',
        answer: 'Ce faci dimineața?',
        options: [
          { label: 'Câte ore dormi?', value: 'Câte ore dormi?', isCorrect: false },
          { label: 'Ce faci dimineața?', value: 'Ce faci dimineața?', isCorrect: true },
          { label: 'Unde lucrezi?', value: 'Unde lucrezi?', isCorrect: false },
        ],
      } as PickAnswerActivityType,
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I cook dinner every evening.',
        answer: 'Gătesc cină în fiecare seară.',
      } as TypeAnswerActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'When do you go to bed?',
        answer: 'Când te culci?',
        options: [
          { label: 'Când te culci?', value: 'Când te culci?', isCorrect: true },
          { label: 'Cât timp stai la birou?', value: 'Cât timp stai la birou?', isCorrect: false },
          {
            label: 'Cât timp petreci la telefon?',
            value: 'Cât timp petreci la telefon?',
            isCorrect: false,
          },
        ],
      } as PickAnswerActivityType,
    },
  ],
};

const basicEnglishLesson: Lesson = {
  id: '4',
  title: 'Basic English for Beginners',
  description:
    'This lesson is designed for complete beginners who are Romanian speakers, covering basic greetings, introductions, and simple vocabulary.',
  activities: [
    {
      type: 'listening',
      activity: {
        sentence: 'Hello, my name is Alex.',
        answer: 'Bună, mă numesc Alex.',
        options: [
          'Bună, mă numesc Alex.',
          'Salut, eu sunt Maria.',
          'Bună ziua, numele meu este Ion.',
        ],
      } as ListeningActivityType,
    },
    {
      type: 'matchingPairs',
      activity: {
        sentence: 'Match the word with its meaning:',
        answers: [
          ['Book', 'Carte'],
          ['Dog', 'Câine'],
          ['Cat', 'Pisică'],
          ['House', 'Casa'],
        ],
      } as MatchingPairsActivityType,
    },
    {
      type: 'missingWord',
      activity: {
        sentence: 'I like to @@@.',
        answer: 'read',
        options: [
          { label: 'play', value: 'play' },
          { label: 'watch', value: 'watch' },
          { label: 'read', value: 'read' },
        ],
      } as MissingWordActivityType,
    },
    {
      type: 'dragWords',
      activity: {
        sentence: 'She drinks @@@ every morning.',
        answer: 'tea',
        options: ['milk', 'juice', 'coffee', 'tea'],
      } as DragWordsActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'How are you?',
        answer: 'Cum ești?',
        options: [
          { label: 'Ce faci?', value: 'Ce faci?', isCorrect: true },
          { label: 'Cât de înalt ești?', value: 'Cât de înalt ești?', isCorrect: false },
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
        ],
      } as PickAnswerActivityType,
    },
    {
      type: 'typeAnswer',
      activity: {
        sentence: 'I am from Romania.',
        answer: 'Eu sunt din România.',
      } as TypeAnswerActivityType,
    },
    {
      type: 'pickAnswer',
      activity: {
        sentence: 'What is this?',
        answer: 'Ce este asta?',
        options: [
          { label: 'Unde ești?', value: 'Unde ești?', isCorrect: false },
          { label: 'Cine ești?', value: 'Cine ești?', isCorrect: false },
          { label: 'Ce este asta?', value: 'Ce este asta?', isCorrect: true },
        ],
      } as PickAnswerActivityType,
    },
  ],
};

const lessons: Lesson[] = [
  firstLessonDemo,
  firstLesson,
  greetingsLesson,
  everydayActivitiesLesson,
  basicEnglishLesson,
];

interface LearnState {
  lessons: Lesson[];
  completed: string[];
  current: string;
  stats: UserStats;
  // setTypedCategory: (category: string) => void;
  setCompleted: (id: string, wonStats: LearningLessonStats) => void;
  reset: () => void;
}

const initialState: Pick<LearnState, 'lessons' | 'completed' | 'current' | 'stats'> = {
  lessons: lessons,
  completed: [],
  current: lessons.at(0)?.id ?? '',
  stats: { balloons: 0, experience: 0, lives: 7 },
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
        }) as LearnState,
    },
  ),
);
