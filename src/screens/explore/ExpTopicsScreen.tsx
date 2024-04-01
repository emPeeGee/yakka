import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@/core/providers';
import { ExploreTopic } from '@/types';
import {
  HeaderScroll,
  Choice,
  ChoiceGroup,
  ContainerWithInsets,
  Emoji,
  Loader,
  TextField,
  Tooltip,
  EnhancedText,
  Button,
} from '@/ui/core';
import { HeartIcon, MagnifyingGlassIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { useExploreStore } from './exploreState';

export const ExpTopicsScreen = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const { navigate } = useNavigation();
  const [typedTopic, setTypedTopic] = useState('');
  const { withAccessControl, user } = useAuth();
  const { init, isLoading, topics, exploreUsers } = useExploreStore();
  const favoritesTooltipRef = useRef<Tooltip>(null);

  console.log('explore users', exploreUsers);

  useEffect(() => {
    init(user);
  }, []);

  return (
    <ContainerWithInsets>
      <View
        style={{
          padding: theme.spacing.md,
          // flex: 1,
          height: '100%',
        }}>
        <HeaderScroll
          title="exp.learnToday"
          scrollContainerStyle={{ flexGrow: 1 }}
          Right={() => (
            <Tooltip
              ref={favoritesTooltipRef}
              actionType="longPress"
              height="auto"
              backgroundColor={theme.colors.info}
              pointerColor={theme.colors.info}
              popover={<EnhancedText style={{ color: theme.colors.base0 }} tx="voc.favorites" />}>
              <Button
                width="auto"
                backgroundColor={theme.colors.secondary500}
                color={theme.colors.primary900}
                Left={() => HeartIcon({ width: 26, height: 26, fill: theme.colors.primary900 })}
                style={{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs }}
                onPress={withAccessControl(
                  () => navigate('ExpFavorites' as never),
                  () => navigate('Auth', { screen: 'AuthSignUp' }),
                )}
                onLongPress={() => {
                  favoritesTooltipRef.current?.toggleTooltip();
                }}
              />
            </Tooltip>
          )}>
          {isLoading ? (
            <View style={[gStyles.centerColumn, { flex: 1 }]}>
              <Loader />
            </View>
          ) : (
            <>
              <View
                style={{
                  paddingVertical: theme.spacing.md,
                }}>
                <TextField
                  value={typedTopic}
                  onChangeText={setTypedTopic}
                  placeholderTx="exp.searchTopic"
                  style={{ paddingVertical: theme.spacing.md }}
                  RightAccessory={props => (
                    <View style={[props.style]}>
                      <MagnifyingGlassIcon />
                    </View>
                  )}
                />
              </View>
              <ChoiceGroup
                options={topics.map(
                  t =>
                    ({
                      value: t,
                      tx: t.topic_name,
                      Left: () => <Emoji emoji={t.emoji} />,
                    }) as Choice<ExploreTopic>,
                )}
                onChange={topic => {
                  setTimeout(() => {
                    withAccessControl(
                      () => navigate('ExpSubtopics' as never, { topic } as never),
                      () => navigate('Auth', { screen: 'AuthSignUp' }),
                    )();
                  });
                }}
              />
            </>
          )}
        </HeaderScroll>
      </View>
    </ContainerWithInsets>
  );
};
