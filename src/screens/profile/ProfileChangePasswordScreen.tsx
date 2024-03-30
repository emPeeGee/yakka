import { useCallback, useState } from 'react';
import { Alert, View, Image } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { supabase } from '@/api';
import { useAuth } from '@/core/providers';
import {
  ALERT_LEVEL,
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  HeaderPlaceholder,
  Loader,
  TextField,
  useAlert,
} from '@/ui/core';
import { EyeIcon, EyeOffIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ProfileChangePasswordScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const { username } = useAuth();
  const alert = useAlert();
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const onEyeHandler = useCallback(() => {
    setHidePassword(prev => !prev);
  }, []);

  async function editProfile() {
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
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);

    if (data.user) {
      alert({ tx: 'auth.passwordChanged', level: ALERT_LEVEL.Success });
      navigate('ProfProfile');
    }
  }

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1 }}>
        <View style={[gStyles.fullWidthFromStart, { gap: theme.spacing.md }]}>
          <HeaderPlaceholder />

          <View style={gStyles.centerColumn}>
            <Image
              source={require('../../assets/profile.png')}
              resizeMode="contain"
              style={{
                height: 180,
                width: 180,
              }}
            />
          </View>
          <EnhancedText style={{ textAlign: 'center' }} preset="heading">
            {username}
          </EnhancedText>

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
          <Button
            tx="common.save"
            color={theme.colors.base0}
            backgroundColor={theme.colors.secondary500}
            onPress={editProfile}
            disabled={loading}
            Right={() => (loading ? <Loader size="s" /> : undefined)}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
