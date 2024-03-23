import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { EnhancedText, Card, Button } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const FullAccessPrompt = () => {
  const { theme, appColorScheme } = useTheme();
  const { navigate } = useNavigation();

  return (
    <View style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]}>
      <BlurView
        intensity={20}
        tint={appColorScheme}
        experimentalBlurMethod="dimezisBlurView"
        style={{ height: '100%', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Card style={{ marginHorizontal: theme.spacing.lg }}>
            <View style={{ gap: theme.spacing.md }}>
              <EnhancedText preset="subheading" tx="auth.unlockAccessTitle" />
              <EnhancedText style={theme.typography.sizes.md} tx="auth.unlockAccessDetails" />

              <Button
                tx="common.createProfile"
                backgroundColor={theme.colors.secondary500}
                onPress={() => navigate('Auth', { screen: 'AuthSignUp' })}
              />
            </View>
          </Card>
        </View>
      </BlurView>
    </View>
  );
};
