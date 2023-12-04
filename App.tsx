import { ThemeProvider } from '@/ui/theme';

import { ApplicationConfigurator } from './ApplicationConfigurator';

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <ThemeProvider>
      <ApplicationConfigurator />
    </ThemeProvider>
  );
}
