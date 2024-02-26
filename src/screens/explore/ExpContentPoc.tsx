import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import Markdown from 'react-native-marked';

export const ExpContentScreen = () => {
  const [file, setFile] = useState<string>('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    fetch(require('../../README.md'))
      .then(res => res.text())
      .then(text => setFile(text));
  }, []);

  return (
    <ScrollView>
      <Markdown
        styles={{ h1: { backgroundColor: 'purple' } }}
        value={file}
        flatListProps={{
          initialNumToRender: 8,
        }}
      />
    </ScrollView>
  );
};
