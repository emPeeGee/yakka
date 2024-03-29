import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  HeaderPlaceholder,
  HeroWithChat,
  TextField,
} from '@/ui/core';
import { EyeIcon, EyeOffIcon, PasswordIcon, UserCircleIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const LoginScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme, appColorScheme } = useTheme();
  const isDark = appColorScheme === 'dark';
  const gStyles = useGlobalThemedStyles();
  const [hidePassword, setHidePassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEyeHandler = useCallback(() => {
    setHidePassword(prev => !prev);
  }, []);

  const onSkipHandler = useCallback(() => {
    navigate('App', { screen: 'LearnTree' });
  }, [navigate]);

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
              value={email}
              onChangeText={setEmail}
              labelTx="auth.email"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="emailAddress"
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
            <Button
              tx="auth.login"
              color={theme.colors.base0}
              backgroundColor={theme.colors.secondary500}
              onPress={() => {
                navigate('' as never);
              }}
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
            />
            <Button
              tx="auth.resetPassword"
              width="auto"
              backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
              color={isDark ? theme.colors.primary100 : theme.colors.primary900}
              Left={PasswordIcon}
            />
          </View>
          <Button
            tx="auth.contWithoutProf"
            backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
            color={isDark ? theme.colors.primary100 : theme.colors.primary900}
            onPress={onSkipHandler}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
