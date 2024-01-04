import { FirstLaunchProvider, HapticsProvider } from '@/core/providers';
import { RootNavigator } from '@/navigation';
import './src/core/i18n';

export function ApplicationConfigurator() {
  return (
    <HapticsProvider>
      <FirstLaunchProvider>
        <RootNavigator />
      </FirstLaunchProvider>
    </HapticsProvider>
  );
}
