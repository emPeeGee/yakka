import { TouchableOpacity, View } from 'react-native';

import { SelectableOption } from '@/types';
import { EnhancedText } from './EnhancedText';
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
                backgroundColor: theme.colors.primary,
              }}
            />
          )}
        </View>
        <EnhancedText>{label}</EnhancedText>
      </View>
    </TouchableOpacity>
  );
}

type RadioGroupProps<T> = {
  label: string;
  options: SelectableOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function RadioGroup<T>({ label, options, value, onChange }: RadioGroupProps<T>) {
  return (
    <View>
      <EnhancedText>{label}</EnhancedText>
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
