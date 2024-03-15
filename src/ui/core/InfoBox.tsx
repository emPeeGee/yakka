import { View } from 'react-native';

import { TxKeyPath } from '@/core/i18n';
import { EnhancedText } from './EnhancedText';
import { InfoIcon } from '../icons';
import { useTheme, useGlobalThemedStyles } from '../theme';
import Tooltip from '../Tooltip/Tooltip';

type InfoBoxProps = {
  color: string;
  txTitle: TxKeyPath;
  value: string | number;
  Icon: () => JSX.Element;
  txInfo?: TxKeyPath;
};

export const InfoBox = ({ color, txTitle, txInfo, value: text, Icon }: InfoBoxProps) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <View
      style={{
        flex: 1,
        height: 'auto',
        flexDirection: 'column',
        borderWidth: theme.borders.medium,
        borderColor: color,
        borderRadius: theme.borderRadius.lg,
        width: '100%',
        overflow: 'hidden',
      }}>
      <View style={{ backgroundColor: color, paddingVertical: theme.spacing.sm }}>
        <View style={[gStyles.centerRow, { gap: theme.spacing.xxs }]}>
          <EnhancedText
            tx={txTitle}
            size="lg"
            weight="medium"
            style={{ color: theme.colors.base0, textAlign: 'center' }}
          />
          {txInfo && (
            <Tooltip
              backgroundColor={theme.colors.info}
              pointerColor={theme.colors.info}
              popover={<EnhancedText style={{ color: theme.colors.base0 }} tx={txInfo} />}
              overlayColor=""
              width="90%"
              height="auto"
              withOverlay={false}>
              <InfoIcon />
            </Tooltip>
          )}
        </View>
      </View>
      <View
        style={[
          gStyles.centerRow,
          {
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            gap: theme.spacing.xs,
          },
        ]}>
        <Icon />
        <EnhancedText
          text={String(text)}
          size="lg"
          weight="medium"
          style={{ textAlign: 'center' }}
        />
      </View>
    </View>
  );
};
