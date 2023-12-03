import { ThemeProvider } from '@/ui/theme/theme-provider';

import { ApplicationConfigurator } from './application-configurator';

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <ThemeProvider>
      <ApplicationConfigurator />
    </ThemeProvider>
  );
}
