import { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';

import Markdown from 'react-native-marked';
import { useShallow } from 'zustand/react/shallow';

import { Explore } from '@/types';
import {
  Button,
  EnhancedText,
  FocusAwareStatusBar,
  HeaderScroll,
  HeroLoading,
  Tooltip,
} from '@/ui/core';
import { HeartIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { useExploreStore } from './exploreState';

export const ExpContentScreen = ({ route }) => {
  const { theme } = useTheme();
  const { setExploreUsers } = useExploreStore();
  const explore = route.params as Explore;
  const expUser = useExploreStore(
    useShallow(state => state.exploreUsers.find(eu => eu.explore_id === explore.explore_id)),
  );

  const [file, setFile] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(!!expUser?.liked);
  const favoritesTooltipRef = useRef<Tooltip>(null);

  useEffect(() => {
    setTimeout(() => {
      setFile(explore.lesson_content);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <HeaderScroll
      title={route.params.lesson_name}
      withBackButton
      scrollContainerStyle={{
        paddingHorizontal: theme.spacing.md,
      }}
      Right={
        loading
          ? () => null
          : () => (
              <Tooltip
                ref={favoritesTooltipRef}
                actionType="longPress"
                height="auto"
                backgroundColor={theme.colors.info}
                pointerColor={theme.colors.info}
                popover={<EnhancedText style={{ color: theme.colors.base0 }} tx="voc.favorites" />}>
                <Button
                  width="auto"
                  backgroundColor={theme.colors.background}
                  Left={() =>
                    HeartIcon({ width: 26, height: 26, filled: isLiked, fill: theme.colors.chilly })
                  }
                  style={{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs }}
                  onPress={() => {
                    setIsLiked(prev => !prev);
                    setExploreUsers(isLiked ? 'delete' : 'add', {
                      explore_id: expUser?.explore_id || explore.explore_id,
                      explore_user_id: expUser?.explore_user_id,
                    });
                  }}
                  onLongPress={() => {
                    favoritesTooltipRef.current?.toggleTooltip();
                  }}
                />
              </Tooltip>
            )
      }>
      <FocusAwareStatusBar />
      {loading ? (
        <View style={{ paddingTop: theme.spacing.xl }}>
          <HeroLoading />
        </View>
      ) : (
        <Markdown
          theme={{
            colors: {
              border: theme.colors.border,
              text: theme.colors.textPri,
              link: theme.colors.secondary500,
              code: theme.colors.secondary900,
            },
          }}
          styles={{ h1: { backgroundColor: 'purple' } }}
          value={file}
          flatListProps={{
            initialNumToRender: 8,
            style: { backgroundColor: theme.colors.background },
          }}
        />
      )}
    </HeaderScroll>
  );
};
