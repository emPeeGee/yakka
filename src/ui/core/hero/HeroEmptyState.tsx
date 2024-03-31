import { View } from 'react-native';

import { TxKeyPath } from '@/core/i18n';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { HeroWithChat } from './HeroWithChat';
import { EnhancedText } from '../EnhancedText';

type HeroEmptyStateProps = {
  notFound?: boolean;
  title?: TxKeyPath;
  description?: TxKeyPath;
};
export const HeroEmptyState = ({ title, description, notFound = false }: HeroEmptyStateProps) => {
  const gStyles = useGlobalThemedStyles();
  const { theme } = useTheme();

  return (
    <View style={[gStyles.centerColumn, { gap: theme.spacing.xl, flex: 1 }]}>
      <HeroWithChat hero="tears" width={114} height={120} />
      <EnhancedText
        weight="bold"
        preset="heading"
        tx={title ? title : notFound ? 'common.noEntriesFound' : 'common.noEntriesYet'}
        style={[{ color: theme.colors.secondary700 }, theme.typography.sizes.xl]}
      />
      <EnhancedText
        weight="bold"
        preset="subheading"
        tx={
          description
            ? description
            : notFound
              ? 'common.noEntriesFoundDetails'
              : 'common.noEntiresYetDetails'
        }
        style={[
          { width: '75%', textAlign: 'center', color: theme.colors.textSec },
          theme.typography.sizes.lg,
        ]}
      />
    </View>
  );
};
