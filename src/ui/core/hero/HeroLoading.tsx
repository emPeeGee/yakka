import { View } from 'react-native';

import { TxKeyPath } from '@/core/i18n';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { HeroWithChat } from './HeroWithChat';
import { EnhancedText } from '../EnhancedText';
import { Loader } from '../Loader';

type HeroLoadingProps = {
  suggestion?: TxKeyPath;
};

export const HeroLoading = ({ suggestion }: HeroLoadingProps) => {
  const gStyles = useGlobalThemedStyles();
  const { theme } = useTheme();

  return (
    <View style={[gStyles.centerColumn, { gap: theme.spacing.xl, flex: 1 }]}>
      <HeroWithChat hero="clock" chatPosition="top" tx="common.sheep" width={100} height={180} />
      <EnhancedText
        weight="bold"
        preset="heading"
        tx="common.loading"
        style={[{ color: theme.colors.secondary700 }, theme.typography.sizes.xl]}
      />
      <Loader />
      {suggestion && (
        <EnhancedText
          weight="bold"
          preset="subheading"
          tx={suggestion}
          style={[
            { width: '75%', textAlign: 'center', color: theme.colors.textSec },
            theme.typography.sizes.lg,
          ]}
        />
      )}
    </View>
  );
};
