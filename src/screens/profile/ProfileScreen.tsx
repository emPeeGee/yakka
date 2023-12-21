import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg } from 'react-native-svg';

import { noop } from '@/core/utils';
import { Theme } from '@/types';
import { Button, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';

const GoToSettings = () => {
  const { navigate } = useNavigation();
  return <Button onPress={() => navigate('Settings' as unknown as never)} title="Settings" />;
};

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const headerHeight = useHeaderHeight();

  return (
    <View>
      {/* TODO: thoughts on how to export it */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Svg width="375" height="276" viewBox="0 0 375 276" fill="none">
          <Path
            d="M199.81 125.92C321.578 132.028 389.543 78.392 408.304 50.8105L464.252 -71.1497C418.522 -66.6995 305.335 -65.9644 218.428 -98.6253C109.793 -139.451 45.3276 -145.631 -120.477 -111.942C-253.121 -84.9906 -244.976 132.779 -224.324 238.295L-9.88153 275.653C9.27883 223.197 78.0416 119.812 199.81 125.92Z"
            fill="#3DB2FF"
          />
        </Svg>
      </View>
      {/* TODO: 42 is hardcoded */}
      <View style={{ height: headerHeight + 42 }}></View>

      <View style={[styles.container]}>
        <View style={styles.userContainer}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImg} />
          <View style={styles.nameContainer}>
            <EnhancedText style={styles.name}>Mihail Mitrofanov</EnhancedText>
            <EnhancedText style={styles.grade}>Newbie</EnhancedText>
          </View>

          {/* TODO: for future to implement */}
          <Pressable onPress={noop}>
            <FontAwesome5 name="edit" size={26} color={theme.colors.textPri} />
          </Pressable>
        </View>

        <Separator />

        <View style={styles.statisticsContainer}>
          <View style={styles.statContainer}>
            <View>
              <EnhancedText style={styles.statValue}>2+ hours</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel}>Total learn</EnhancedText>
            </View>
          </View>

          <View style={{ width: 1, height: 24, backgroundColor: theme.colors.border }} />

          <View style={styles.statContainer}>
            <View>
              <EnhancedText style={styles.statValue}>20</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel}>Achievements</EnhancedText>
            </View>
          </View>

          {/* TODO: vertical separator */}
          <View style={{ width: 1, height: 24, backgroundColor: theme.colors.border }} />

          <View style={styles.statContainer}>
            <View>
              <EnhancedText style={styles.statValue}>1</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel}>Languages</EnhancedText>
            </View>
          </View>
        </View>

        <GoToSettings />
      </View>
    </View>
  );
};

function Separator() {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', paddingVertical: theme.spacing.medium }}>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }}></View>
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.medium,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nameContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.small,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    profileImg: {
      height: 85,
      width: 85,
    },
    name: {
      fontSize: 18,
      color: theme.colors.textPri,
    },
    grade: {
      fontSize: 12,
      color: theme.colors.textSec,
    },
    statisticsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statLabel: { color: theme.colors.textSec, fontSize: 12 },
    statValue: { fontSize: 18 },
  });
