import { SheetProvider } from 'react-native-actions-sheet';

import { FirstLaunchProvider, HapticsProvider } from '@/core/providers';
import { RootNavigator } from '@/navigation';
import './src/core/i18n';
import './src/ui/sheets/sheets';

export function ApplicationConfigurator() {
  return (
    <HapticsProvider>
      <FirstLaunchProvider>
        <SheetProvider>
          <RootNavigator />
        </SheetProvider>
      </FirstLaunchProvider>
    </HapticsProvider>
  );
}
