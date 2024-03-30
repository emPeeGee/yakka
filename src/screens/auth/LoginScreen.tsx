import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { supabase } from '@/api';
import {
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  HeaderPlaceholder,
  HeroWithChat,
  Loader,
  TextField,
} from '@/ui/core';
import { EyeIcon, EyeOffIcon, PasswordIcon, UserCircleIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const LoginScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme, isDark } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const [hidePassword, setHidePassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onEyeHandler = useCallback(() => {
    setHidePassword(prev => !prev);
  }, []);

  const onSkipHandler = useCallback(() => {
    navigate('App', { screen: 'LearnTree' });
  }, [navigate]);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
    console.log('data', data, error?.cause, error?.message, error?.status, error?.name);

    if (data.user) {
      navigate('App', { screen: 'LearnTree' });
    }
  }

  return (
    <ContainerWithInsets>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={[
          { flexGrow: 1, justifyContent: 'center', paddingHorizontal: theme.spacing.md },
        ]}>
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
          <TextField
            value={password}
            onChangeText={setPassword}
            labelTx="auth.password"
            secureTextEntry={hidePassword}
            autoCorrect={false}
            // returnKeyType="go"
            textContentType="password"
            inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
            labelTextProps={{ style: { color: theme.colors.primary700 } }}
            RightAccessory={props => (
              <EnhancedPressable {...props} onPress={onEyeHandler}>
                {hidePassword ? <EyeIcon /> : <EyeOffIcon />}
              </EnhancedPressable>
            )}
          />
          <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
            <Button
              tx="auth.login"
              color={theme.colors.base0}
              backgroundColor={theme.colors.secondary500}
              onPress={signInWithEmail}
              disabled={loading}
              Left={UserFocusIcon}
              Right={() => (loading ? <Loader size="s" /> : undefined)}
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
              tx="auth.signUp"
              width="auto"
              backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
              color={isDark ? theme.colors.primary100 : theme.colors.primary900}
              Left={UserCircleIcon}
              onPress={() => navigate('AuthSignUp')}
            />
            <Button
              tx="auth.resetPassword"
              width="auto"
              backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
              color={isDark ? theme.colors.primary100 : theme.colors.primary900}
              Left={PasswordIcon}
              onPress={() => navigate('AuthResetPasswordRequest')}
            />
          </View>
          <Button
            tx="auth.contWithoutProf"
            backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
            color={isDark ? theme.colors.primary100 : theme.colors.primary900}
            onPress={onSkipHandler}
          />
        </View>
      </ScrollView>
    </ContainerWithInsets>
  );
};
