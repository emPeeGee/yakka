import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { useTheme } from '@/ui/theme';
import { Button } from './Button';
import { Card } from './Card';
import { EnhancedText } from './EnhancedText';

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
          <Card style={{ marginHorizontal: theme.spacing.lg }} maxHeight="auto">
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
