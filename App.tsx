import { Text } from 'react-native';

import { ThemeProvider } from '@/ui/theme';
import { ApplicationConfigurator } from './ApplicationConfigurator';
import { useFonts, Fredoka_500Medium } from '@expo-google-fonts/fredoka';

// eslint-disable-next-line import/no-default-export
export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Fredoka_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <Text style={{ fontFamily: 'Fredoka_500Medium', fontSize: 40 }}>Inter Black</Text>
      <ApplicationConfigurator />
    </ThemeProvider>
  );
}
