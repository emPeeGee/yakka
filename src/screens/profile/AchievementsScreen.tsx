import { View } from 'react-native';

import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { noop } from '@/core/utils';
import { EnhancedText, TextField } from '@/ui/core';

export const AchievementsScreen = () => {
  return (
    <View>
      <EnhancedText>Achievements</EnhancedText>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={noop}>
        Login with Facebook
      </FontAwesome.Button>

      <TextField labelTx="temp.sound" status="error" />

      <TextField
        label="123"
        inputWrapperStyle={{ width: '100%' }}
        // multiline
        LeftAccessory={props => (
          <View style={[props.style]}>
            <Ionicons color="white" size={26} name="airplane-outline" />
          </View>
        )}
      />

      <TextField
        label="123"
        inputWrapperStyle={{ width: '100%' }}
        // multiline
        LeftAccessory={props => (
          <View style={[props.style]}>
            <Ionicons color="white" size={26} name="airplane-outline" />
          </View>
        )}
      />

      <EnhancedText tx="common.back" />
      <EnhancedText tx="common.back" preset="bold" />
      <EnhancedText tx="common.back" preset="formHelper" />
      <EnhancedText tx="common.back" preset="formLabel" />
      <EnhancedText tx="common.back" preset="subheading" />
      <EnhancedText tx="common.back" preset="heading" />
    </View>
  );
};
