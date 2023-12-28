import React from 'react';
import { FlatList, StyleSheet, Switch, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';

import { isBool } from '@/core/utils';
import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText } from './EnhancedText';

// IDEA: Conditional type
export type DataListType = {
  label: string;
  Icon?: (props: SvgProps) => React.JSX.Element;
  screen?: string;
  callback?: (...args: unknown[]) => void;
  color?: string;
  withChevron?: boolean;
  checked?: boolean;
};

type ListProps = {
  title: string;
  data: DataListType[];
  bounces?: boolean;
};

export const List = ({ data, title, bounces = false }: ListProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();

  // NOTE: I thought about creating a separate render item for every case, but since it is small, there's no need.
  return (
    <FlatList
      style={styles.container}
      bounces={bounces}
      alwaysBounceHorizontal={bounces}
      alwaysBounceVertical={bounces}
      overScrollMode={bounces ? 'auto' : 'never'}
      ListHeaderComponent={() => <EnhancedText style={styles.listHeader}>{title}</EnhancedText>}
      ListHeaderComponentStyle={styles.listHeaderContainer}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item.label}
      renderItem={({ item: { label, screen, Icon, callback, color, withChevron, checked } }) => {
        const onPressHandle = () => {
          if (callback) {
            if (isBool(checked)) {
              // Alternative via ref:
              // switchRef.current.onChange(!checked);
              // switchRef.current.setNativeProps({ value: !checked });

              callback(!checked);
              return;
            }

            callback();
          } else {
            navigate(screen as never);
          }
        };

        return (
          <EnhancedPressable
            onPress={() => onPressHandle()}
            style={[gStyles.centerRowBetween, styles.itemContainer]}>
            {Icon && <Icon />}

            <View style={[gStyles.fullWidthFromStart, { paddingLeft: Icon ? 12 : 0 }]}>
              <EnhancedText style={{ ...(color && { color }) }}>{label}</EnhancedText>
            </View>
            {withChevron && (
              <Ionicons name="chevron-forward" color={theme.colors.textPri} size={16} />
            )}
            {isBool(checked) && (
              <Switch
                // TODO?: When pressing the switch, it show a unknown color
                onChange={e => {
                  callback && callback(e.nativeEvent.value);
                }}
                value={checked}
                thumbColor={checked ? theme.colors.secondary100 : undefined}
                trackColor={{ true: theme.colors.secondary60, false: theme.colors.base40 }}
              />
            )}
          </EnhancedPressable>
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
