import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';

import { rootLog } from '@/core/logger';
import { Theme } from '@/types';
import { EnhancedText } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export type DataListType = {
  label: string;
  Icon?: (props: SvgProps) => React.JSX.Element;
  screen?: string;
  callback?: () => void;
  color?: string;
  withChevron?: boolean;
};

type ListProps = {
  title: string;
  data: DataListType[];
};

/* TODO: Extract, and use styles */
export const List = ({ data, title }: ListProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();

  rootLog.info(data);

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => <EnhancedText style={styles.listHeader}>{title}</EnhancedText>}
      // TODO: 12 doesnt exist in theme
      ListHeaderComponentStyle={styles.listHeaderContainer}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item.label}
      // different renred items ?
      // TODO: thought on making separate render item for case, but since it is small, no need
      renderItem={({ item: { label, screen, Icon, callback, color, withChevron } }) => {
        return (
          <Pressable
            onPress={() => (callback ? callback() : navigate(screen as never))}
            style={[gStyles.centerRowBetween, styles.itemContainer]}>
            {Icon && <Icon />}

            <View style={[gStyles.fullWidthFromStart, { paddingLeft: Icon ? 12 : 0 }]}>
              <EnhancedText style={{ ...(color && { color }) }}>{label}</EnhancedText>
            </View>
            {withChevron && (
              <Ionicons name="chevron-forward" color={theme.colors.textPri} size={16} />
            )}
          </Pressable>
        );
      }}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.small,
      marginBottom: theme.spacing.large,
    },
    listHeader: { color: theme.colors.textSec, fontSize: 12 },
    listHeaderContainer: { paddingHorizontal: 12, marginBottom: 6 },
    contentContainer: { paddingHorizontal: 12, paddingVertical: 12 },
    itemContainer: {
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
  });
