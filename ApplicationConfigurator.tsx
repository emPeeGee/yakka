import { FirstLaunchProvider } from '@/core/providers';
import { RootNavigator } from '@/navigation';

export function ApplicationConfigurator() {
  return (
    <FirstLaunchProvider>
      <RootNavigator />
    </FirstLaunchProvider>
  );
}
