import { SheetDefinition, registerSheet } from 'react-native-actions-sheet';

import { StartLessonSheet } from './StartLessonSheet';
import { UnlockFullAccessSheet } from './UnlockFullAccessSheet';

registerSheet('start-lesson-sheet', StartLessonSheet);
registerSheet('unlock-full-access-sheet', UnlockFullAccessSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'start-lesson-sheet': SheetDefinition<{
      payload: {
        title: string;
        description: string;
        isCompleted: boolean;
        lives: number;
      };
      returnValue: boolean;
    }>;
    'unlock-full-access-sheet': SheetDefinition<{
      payload: {
        onCreateProfile: () => void;
      };
    }>;
  }
}

export {};
