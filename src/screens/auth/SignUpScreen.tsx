import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { supabase } from '@/api';
import { isEmail, isNumb } from '@/core/utils';
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
import { EyeIcon, EyeOffIcon, UserCircleIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const SignUpScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const [hidePassword, setHidePassword] = useState(true);
  const alert = useAlert();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confPasswordRef = useRef<TextInput>(null);

  const onEyeHandler = useCallback(() => {
    setHidePassword(prev => !prev);
  }, []);

  async function signUp() {
    setLoading(true);

    if (!isNumb(age)) {
      alert({ tx: 'auth.vaAge', level: ALERT_LEVEL.Info });
      setLoading(false);
      return;
    }

    if (!isEmail(email)) {
      alert({ tx: 'auth.vaEmail', level: ALERT_LEVEL.Info });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert({ tx: 'auth.vaPasswordMatch', level: ALERT_LEVEL.Info });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert({ tx: 'auth.vaPasswordLength', level: ALERT_LEVEL.Info });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          age: parseInt(age),
          avatar_url: '1',
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);

    if (data.user) {
      navigate('AuthSignUpDone');
    }
  }

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { gap: theme.spacing.md }]}>
          <HeaderPlaceholder />
          <ScrollView
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={[
              gStyles.centerColumn,
              { gap: theme.spacing.md, width: '100%' },
            ]}>
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
            <TextField
              value={email}
              onChangeText={setEmail}
              labelTx="auth.email"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="emailAddress"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
              returnKeyType="next"
              onSubmitEditing={() => {
                firstNameRef.current?.focus();
              }}
              blurOnSubmit={false}
            />
            <TextField
              ref={firstNameRef}
              value={firstName}
              onChangeText={setFirstName}
              labelTx="auth.firstName"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="givenName"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
              returnKeyType="next"
              onSubmitEditing={() => {
                lastNameRef.current?.focus();
              }}
              blurOnSubmit={false}
            />
            <TextField
              ref={lastNameRef}
              value={lastName}
              onChangeText={setLastName}
              labelTx="auth.lastName"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="familyName"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
              returnKeyType="next"
              onSubmitEditing={() => {
                ageRef.current?.focus();
              }}
              blurOnSubmit={false}
            />
            <TextField
              ref={ageRef}
              value={age}
              onChangeText={setAge}
              labelTx="auth.age"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="telephoneNumber"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
              blurOnSubmit={false}
            />
            <TextField
              ref={passwordRef}
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
              returnKeyType="next"
              onSubmitEditing={() => {
                confPasswordRef.current?.focus();
              }}
              blurOnSubmit={false}
            />
            <TextField
              ref={confPasswordRef}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              labelTx="auth.confirmPassword"
              secureTextEntry={hidePassword}
              autoCorrect={false}
              textContentType="password"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
              returnKeyType="done"
            />
            <View style={{ height: 30 }} />
          </ScrollView>
        </View>

        <View
          style={[
            { width: '100%', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
            gStyles.centerColumn,
          ]}>
          <Button
            tx="common.createProfile"
            color={theme.colors.base0}
            backgroundColor={theme.colors.secondary500}
            onPress={signUp}
            disabled={loading}
            Left={() => <UserCircleIcon color={theme.colors.secondary100} />}
            Right={() => (loading ? <Loader size="s" /> : undefined)}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
