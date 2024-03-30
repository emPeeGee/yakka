import { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { supabase } from '@/api';
import { useAuth } from '@/core/providers';
import { parseSupabaseUrl } from '@/core/utils';
import {
  ALERT_LEVEL,
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  HeaderPlaceholder,
  HeroWithChat,
  Loader,
  TextField,
  useAlert,
} from '@/ui/core';
import { EyeIcon, EyeOffIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ResetPasswordScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const alert = useAlert();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const { loginWithToken } = useAuth();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const transformedUrl = parseSupabaseUrl(window.location.href);
      const parsedUrl = Linking.parse(transformedUrl);

      const access_token = parsedUrl.queryParams?.access_token;
      const refresh_token = parsedUrl.queryParams?.refresh_token;

      if (typeof access_token === 'string' && typeof refresh_token === 'string') {
        void loginWithToken({ access_token, refresh_token });
      }
    }
  }, []);

  const onEyeHandler = useCallback(() => {
    setHidePassword(prev => !prev);
  }, []);

  const resetPassword = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      alert({ tx: 'auth.vaPasswordMatch', level: ALERT_LEVEL.Error });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert({ tx: 'auth.vaPasswordLength', level: ALERT_LEVEL.Error });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert({
        tx: 'auth.resetPasswordFail',
        text: error.message,
        level: ALERT_LEVEL.Error,
        limit: 2,
      });
    }

    setLoading(false);

    if (data.user) {
      navigate('AuthLogin');
    }
  };

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { gap: theme.spacing.md }]}>
          <HeaderPlaceholder />
          {/* // TODO: the background confetti is cut */}
          <HeroWithChat
            chatPosition="no-chat"
            hero="default"
            withConfetti
            width={90}
            height={109}
          />

          <EnhancedText
            tx="universal.yakka"
            size="xxxl"
            weight="medium"
            style={{ color: theme.colors.primary700, textAlign: 'center' }}
          />

          <View style={[gStyles.centerColumn, { gap: theme.spacing.md, width: '100%' }]}>
            <TextField
              value={password}
              onChangeText={setPassword}
              labelTx="auth.password"
              secureTextEntry={hidePassword}
              autoCorrect={false}
              textContentType="password"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
              RightAccessory={props => (
                <EnhancedPressable {...props} onPress={onEyeHandler}>
                  {hidePassword ? <EyeIcon /> : <EyeOffIcon />}
                </EnhancedPressable>
              )}
            />

            <TextField
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              labelTx="auth.confirmPassword"
              secureTextEntry={hidePassword}
              autoCorrect={false}
              // returnKeyType="go"
              textContentType="password"
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
              tx="auth.login"
              color={theme.colors.base0}
              backgroundColor={theme.colors.secondary500}
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
