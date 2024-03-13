import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';

interface LinesProps {
  numLines: number;
  containerHeight: number;
  lineHeight: number;
  lineStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  renderTopLine?: boolean;
}

export function Lines(props: LinesProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const {
    containerHeight,
    containerStyle,
    numLines,
    lineHeight,
    lineStyle,
    renderTopLine = true,
  } = props;
  const arr = new Array(numLines).fill(0);

  return (
    <View style={[{ height: containerHeight }, containerStyle]}>
      {arr.map((_, idx) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={`line.${idx}`}
          style={[
            { height: lineHeight },
            styles.line,
            idx === 0 && renderTopLine && styles.firstLine,
            lineStyle,
          ]}
        />
      ))}
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    line: { borderBottomWidth: 2, borderBottomColor: theme.colors.border },
    firstLine: { borderTopWidth: 2, borderTopColor: theme.colors.border },
  });
