import { useEffect, useMemo, useState } from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';

import { useIsFocused, useRoute } from '@react-navigation/native';

import { useTheme } from '../theme';

export function FocusAwareStatusBar() {
  const isFocused = useIsFocused();
  const { theme, appColorScheme } = useTheme();
  const { name } = useRoute();
  const isDark = useMemo(() => appColorScheme === 'dark', [appColorScheme]);
  const [backgroundColor, setBackgroundColor] = useState(theme.colors.background);
  const [barStyle, setBarStyle] = useState<StatusBarStyle>(
    isDark ? 'light-content' : 'light-content',
  );

  useEffect(() => {
    if (['LearnTree'].includes(name)) {
      setBackgroundColor(theme.colors.primary500);
    } else if (['VocCategories'].includes(name)) {
      setBackgroundColor(theme.colors.primary700);
    } else if (name === 'ProfileScreen') {
      setBackgroundColor(theme.colors.primary600);
      setBarStyle('light-content');
    } else if (!isDark && name === 'VocStart') {
      setBackgroundColor(theme.colors.primary100);
      setBarStyle('dark-content');
    } else {
      setBackgroundColor(theme.colors.background);
      setBarStyle(isDark ? 'light-content' : 'light-content');
    }
  }, [name, isDark]);

  return isFocused ? (
    <StatusBar
      animated={true}
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      showHideTransition="fade"
      hidden={false}
    />
  ) : null;
}
