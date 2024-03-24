import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import Markdown from 'react-native-marked';

import { translate } from '@/core/i18n';
import { FocusAwareStatusBar, HeroLoading } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const ExpContentScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const [file, setFile] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: translate(route.params.lesson_name),
    });

    setTimeout(() => {
      setFile(route.params.lesson_content);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: theme.spacing.md }}>
      <FocusAwareStatusBar />
      {loading ? (
        <View style={{ paddingTop: theme.spacing.xl }}>
          <HeroLoading />
        </View>
      ) : (
        <Markdown
          theme={{
            colors: {
              border: theme.colors.border,
              text: theme.colors.textPri,
              link: theme.colors.secondary500,
              code: theme.colors.secondary900,
            },
          }}
          styles={{ h1: { backgroundColor: 'purple' } }}
          value={file}
          flatListProps={{
            initialNumToRender: 8,
            style: { backgroundColor: theme.colors.background },
          }}
        />
      )}
    </ScrollView>
  );
};
