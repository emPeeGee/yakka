import { useState } from 'react';
import { View } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { supabase } from '@/api';
import { enhancedAlert } from '@/core/utils';
import {
  Button,
  ContainerWithInsets,
  EnhancedText,
  HeaderPlaceholder,
  HeroWithChat,
  Loader,
  TextField,
} from '@/ui/core';
import { PasswordIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ResetPasswordRequestScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme, appColorScheme } = useTheme();
  const isDark = appColorScheme === 'dark';
  const gStyles = useGlobalThemedStyles();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const resetPassword = async () => {
    const resetPasswordURL = Linking.createURL('/ResetPassword');

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetPasswordURL,
    });

    if (error) {
      enhancedAlert(error.message);
    } else {
      enhancedAlert('Email has been sent');
      navigate('AuthLogin');
    }

    setLoading(false);

    return { data, error };
  };

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { gap: theme.spacing.md }]}>
          <HeaderPlaceholder />
          <HeroWithChat chatPosition="no-chat" hero="default" width={90} height={109} />

          <EnhancedText
            tx="universal.yakka"
            size="xxxl"
            weight="medium"
            style={{ color: theme.colors.primary700, textAlign: 'center' }}
          />

          <View style={[gStyles.centerColumn, { gap: theme.spacing.md, width: '100%' }]}>
            <TextField
              value={email}
              onChangeText={setEmail}
              labelTx="auth.email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
            />
          </View>
        </View>

        <View
          style={[
            { width: '100%', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
            gStyles.centerColumn,
          ]}>
          <View
            style={[gStyles.centerRowBetween, { width: '100%', justifyContent: 'space-evenly' }]}>
            <Button
              tx="auth.resetPassword"
              width="auto"
              backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
              color={isDark ? theme.colors.primary100 : theme.colors.primary900}
              Left={PasswordIcon}
              onPress={resetPassword}
              disabled={loading}
              Right={() => (loading ? <Loader size="s" /> : undefined)}
            />
          </View>
        </View>
      </View>
    </ContainerWithInsets>
  );
};
