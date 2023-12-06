import { TouchableOpacity, View, Text } from 'react-native';

import { useTheme } from '../theme';

type RadioButtonProps<T> = {
  label: string;
  selected: boolean;
  value: T;
  onSelect: (value: T) => void;
};

function RadioButton<T>({ label, value, selected, onSelect }: RadioButtonProps<T>) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={() => onSelect(value)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: selected ? theme.colors.primary : 'transparent',
          }}>
          {selected && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: theme.colors.accent,
              }}
            />
          )}
        </View>
        <Text style={{ color: theme.colors.text }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

// TODO: better name and export
export type RadioGroupOption<T> = {
  label: string;
  value: T;
};

type RadioGroupProps<T> = {
  label: string;
  options: RadioGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function RadioGroup<T>({ label, options, value, onChange }: RadioGroupProps<T>) {
  const { theme } = useTheme();

  return (
    <View>
      <Text style={{ color: theme.colors.text }}>{label}</Text>
      {options.map((option, index) => (
        <RadioButton
          key={index}
          label={option.label}
          value={option.value}
          selected={option.value === value}
          onSelect={onChange}
        />
      ))}
    </View>
  );
}
