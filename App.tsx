import { registerRootComponent } from 'expo';

import { ThemeProvider } from '@/ui/theme';
import { ApplicationConfigurator } from './ApplicationConfigurator';

import '@expo/metro-runtime';

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <ThemeProvider>
      <ApplicationConfigurator />
    </ThemeProvider>
  );
}

registerRootComponent(App);
