import React from 'react';
import { View } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

export const HeaderPlaceholder = ({ additionalSpace = 0 }: { additionalSpace?: number }) => {
  const headerHeight = useHeaderHeight();

  return <View style={{ height: headerHeight + additionalSpace }} />;
};
