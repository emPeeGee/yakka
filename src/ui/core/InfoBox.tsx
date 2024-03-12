import { View } from 'react-native';

import { TxKeyPath } from '@/core/i18n';
import { EnhancedText } from '.';
import { useTheme, useGlobalThemedStyles } from '../theme';

type InfoBoxProps = {
  color: string;
  txTitle: TxKeyPath;
  value: string;
  Icon: () => JSX.Element;
};

export const InfoBox = ({ color, txTitle, value: text, Icon }: InfoBoxProps) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <View
      style={{
        flex: 1,
        height: 'auto',
        flexDirection: 'column',
        borderWidth: theme.borders.medium,
        borderColor: color,
        borderRadius: theme.borderRadius.lg,
        width: '100%',
        overflow: 'hidden',
      }}>
      <View style={{ backgroundColor: color, paddingVertical: theme.spacing.sm }}>
        <EnhancedText
          tx={txTitle}
          size="lg"
          weight="medium"
          style={{ color: theme.colors.base0, textAlign: 'center' }}
        />
      </View>
      <View
        style={[
          gStyles.centerRow,
          {
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            gap: theme.spacing.xs,
          },
        ]}>
        <Icon />
        <EnhancedText text={text} size="lg" weight="medium" style={{ textAlign: 'center' }} />
      </View>
    </View>
  );
};
