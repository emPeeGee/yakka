import { FirstLaunchProvider, HapticsProvider } from '@/core/providers';
import { RootNavigator } from '@/navigation';

export function ApplicationConfigurator() {
  return (
    <HapticsProvider>
      <FirstLaunchProvider>
        <RootNavigator />
      </FirstLaunchProvider>
    </HapticsProvider>
  );
}
