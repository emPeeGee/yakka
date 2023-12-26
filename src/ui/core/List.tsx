import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';

import { rootLog } from '@/core/logger';
import { Theme } from '@/types';
import { EnhancedText } from '@/ui/core/index';
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
      ListHeaderComponentStyle={styles.listHeaderContainer}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item.label}
      // NOTE: I thought about creating a separate render item for every case, but since it is small, there's no need.
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
      borderWidth: theme.borders.thin,
      borderRadius: theme.borderRadius.small,
      marginBottom: theme.spacing.large,
    },
    listHeader: { color: theme.colors.textSec, fontSize: 12 },
    listHeaderContainer: {
      paddingHorizontal: theme.spacing.small,
      marginBottom: theme.spacing.tiny,
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.small,
      paddingVertical: theme.spacing.small,
    },
    itemContainer: {
      paddingVertical: theme.spacing.small,
      paddingHorizontal: theme.spacing.small,
    },
  });
