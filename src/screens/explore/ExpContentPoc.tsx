import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import Markdown from 'react-native-marked';

import { translate } from '@/core/i18n';
import { useTheme } from '@/ui/theme';

const content = `
# Present Simple tense

![Present Simple tense](../images/grammar/tense-present-simple.png)

The **Present Simple tense** is the most basic tense in English and uses the base form of the verb (except for the verb _be_). The only change from the base is the addition of **s** for third person singular.

## How do we make the Present Simple tense?

There are two basic structures for the Present Simple:

| subject | main verb      |
| ------- | -------------- |
| +       | Present simple |
`;

export const ExpContentScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const [file, setFile] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: translate(route.params.title),
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires

    // TODO: doesn't work
    // fetch(require(`./content/${route.params.content}`))
    fetch(content)
      .then(res => res.text())
      .then(text => {
        setFile(text);

        // TODO: instead of setTimeout, real time
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: theme.spacing.md }}>
      {loading ? (
        <ActivityIndicator />
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
