import { TouchableOpacity, View, Text } from 'react-native';

type RadioButtonProps<T> = {
  label: string;
  selected: boolean;
  value: T;
  onSelect: (value: T) => void;
};

function RadioButton<T>({ label, value, selected, onSelect }: RadioButtonProps<T>) {
  return (
    <TouchableOpacity onPress={() => onSelect(value)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#3498db',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: selected ? '#3498db' : 'transparent',
          }}>
          {selected && (
            <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: '#fff' }} />
          )}
        </View>
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

// TODO: better name and export
type RadioGroupOption<T> = {
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
  return (
    <View>
      <Text>{label}</Text>
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
