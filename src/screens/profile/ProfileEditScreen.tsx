import { useState } from 'react';
import { Alert, View, Image } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { supabase } from '@/api';
import { useAuth } from '@/core/providers';
import { enhancedAlert, isNumb } from '@/core/utils';
import {
  Button,
  ContainerWithInsets,
  EnhancedText,
  HeaderPlaceholder,
  Loader,
  TextField,
} from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ProfileEditScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name || '');
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name || '');
  const [age, setAge] = useState(user?.user_metadata?.age);
  const [loading, setLoading] = useState(false);

  async function editProfile() {
    setLoading(true);

    if (!isNumb(age)) {
      enhancedAlert('Age should contain only digits');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
        avatar_url: '1',
      },
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);

    if (data.user) {
      enhancedAlert('Profile has been updated');
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
            {`${user?.user_metadata?.first_name || 'Unknown'} ${user?.user_metadata?.last_name}`}
          </EnhancedText>

          <View style={[gStyles.centerColumn, { gap: theme.spacing.md, width: '100%' }]}>
            <TextField
              value={firstName}
              onChangeText={setFirstName}
              labelTx="auth.firstName"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="givenName"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
            />

            <TextField
              value={lastName}
              onChangeText={setLastName}
              labelTx="auth.lastName"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="familyName"
              inputWrapperStyle={{ borderColor: theme.colors.primary700 }}
              labelTextProps={{ style: { color: theme.colors.primary700 } }}
            />

            <TextField
              value={age}
              onChangeText={setAge}
              labelTx="auth.age"
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="telephoneNumber"
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
