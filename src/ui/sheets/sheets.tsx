import { SheetDefinition, registerSheet } from 'react-native-actions-sheet';

import { StartLessonSheet } from './StartLessonSheet';

registerSheet('start-lesson-sheet', StartLessonSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'confirm-sheet': SheetDefinition<{
      payload: {
        title: string;
        description: string;
        isCompleted: boolean;
      };
      returnValue: boolean;
    }>;
  }
}

export {};
