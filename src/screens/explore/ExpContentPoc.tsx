import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import Markdown from 'react-native-marked';

import { translate } from '@/core/i18n';

export const ExpContentScreen = ({ route, navigation }) => {
  const [file, setFile] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('route', route);
    navigation.setOptions({
      title: translate(route.params.title),
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    fetch(require('./content/test.md'))
      .then(res => res.text())
      .then(text => {
        setFile(text);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Markdown
          styles={{ h1: { backgroundColor: 'purple' } }}
          value={file}
          flatListProps={{
            initialNumToRender: 8,
          }}
        />
      )}
    </ScrollView>
  );
};
