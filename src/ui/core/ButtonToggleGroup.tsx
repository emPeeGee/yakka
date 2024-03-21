import { useState, useRef } from 'react';
import { StyleSheet, Animated, LayoutChangeEvent, TouchableOpacity, View } from 'react-native';

import { Theme } from '@/types';
import { useTheme } from '../theme';

interface ToggleButtonProps {
  label: string;
  onPress: () => void;
  selected: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, onPress, selected }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button]}>
      <Animated.Text style={[styles.label, selected && styles.selectedLabel, animatedStyle]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

interface ToggleGroupProps {
  options: string[];
  onOptionChange: (option: string) => void;
}

export const ButtonToggleGroup: React.FC<ToggleGroupProps> = ({ options, onOptionChange }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const positionValue = useRef(new Animated.Value(0)).current;

  const [containerDim, setContainerDim] = useState(0);
  const buttonWidth = containerDim / options.length;

  const handlePress = (option: string, index: number) => {
    setSelectedOption(option);
    onOptionChange(option);
    Animated.timing(positionValue, {
      toValue: buttonWidth * index,
      // toValue: ((index + 1) * 10 + buttonWidth) * index,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View
        style={{ position: 'relative', flexDirection: 'row' }}
        onLayout={(event: LayoutChangeEvent) => {
          setContainerDim(event.nativeEvent.layout.width);
        }}>
        <Animated.View style={[styles.indicator, { left: positionValue, width: buttonWidth }]} />
        {options.map((option, index) => (
          <ToggleButton
            key={option}
            label={option}
            onPress={() => handlePress(option, index)}
            selected={selectedOption === option}
          />
        ))}
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    button: {
      padding: 10,
      marginHorizontal: 5,
      borderRadius: theme.borderRadius.sm,
    },
    label: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    selectedLabel: {
      color: theme.colors.base0,
    },
    indicator: {
      position: 'absolute',
      top: 0,
      height: '100%',
      backgroundColor: theme.colors.secondary500,
      borderRadius: theme.borderRadius.sm,
    },
  });
