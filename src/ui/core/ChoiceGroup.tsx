import { ComponentType } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TxKeyPath } from '@/core/i18n';
import { SelectableOption } from '@/types';
import { EnhancedText } from './EnhancedText';
import { useGlobalThemedStyles, useTheme } from '../theme';

// TODO: to refactor this code, take a look at toggler

type Choice<T> = SelectableOption<T> & { Right?: ComponentType<any>; Left?: ComponentType<any> };

type ChoiceGroupProps<T> = {
  tx?: TxKeyPath;
  options: Choice<T>[];
  value: T;
  onChange: (value: T) => void;
};

type ChoiceOptionProps<T> = {
  tx: TxKeyPath;
  selected: boolean;
  value: T;
  onSelect: (value: T) => void;
  Right?: ComponentType<any>;
  Left?: ComponentType<any>;
};

function ChoiceOption<T>({ tx, value, selected, onSelect, Right, Left }: ChoiceOptionProps<T>) {
  const { theme, appColorScheme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <TouchableOpacity onPress={() => onSelect(value)}>
      <View
        style={{
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',

          borderRadius: theme.borderRadius.xl,
          borderWidth: theme.borders.medium,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
          backgroundColor: selected
            ? appColorScheme === 'dark'
              ? theme.colors.primary900
              : theme.colors.primary100
            : 'transparent',
        }}>
        {Left && (
          <View style={[{ paddingRight: theme.spacing.sm }]}>
            <Left />
          </View>
        )}

        <EnhancedText tx={tx} weight="medium" size="md" style={gStyles.fullWidthFromStart} />

        {Right && (
          <View>
            <Right />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export function ChoiceGroup<T>({ tx, options, value, onChange }: ChoiceGroupProps<T>) {
  const { theme } = useTheme();
  return (
    <View>
      {tx && <EnhancedText tx={tx} />}
      <View style={{ gap: theme.spacing.md }}>
        {options.map((option, index) => (
          <ChoiceOption
            key={index}
            tx={option.tx}
            value={option.value}
            selected={option.value === value}
            onSelect={onChange}
            Right={option.Right}
            Left={option.Left}
          />
        ))}
      </View>
    </View>
  );
}
