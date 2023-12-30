import { Svg, Ellipse } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export function Tile({ completed }: { completed: boolean }) {
  const { theme } = useTheme();

  const mainEllipseColor = completed ? theme.colors.primary : theme.colors.secondary;
  const shadowEllipseColor = completed ? theme.colors.primary800 : theme.colors.secondary800;

  return (
    <Svg width="104" height="97" viewBox="0 0 104 97" fill="none">
      <Ellipse cx="51.7919" cy="52.0112" rx="51.7919" ry="44.9887" fill={shadowEllipseColor} />
      <Ellipse cx="51.7919" cy="44.9887" rx="51.7919" ry="44.9887" fill={mainEllipseColor} />
    </Svg>
  );
}
