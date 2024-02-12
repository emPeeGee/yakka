import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { isRTL, translate } from '@/core/i18n';
import { Theme } from '@/types';
import { EnhancedText, TextProps } from './EnhancedText';
import { useTheme } from '../theme';

export interface TextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled';
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps['text'];
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps['tx'];
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps['txOptions'];
  /**
   * Pass any additional props directly to the label Text component.
   */
  labelTextProps?: TextProps;
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps['text'];
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps['tx'];
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps['txOptions'];
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps;
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps['text'];
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps['tx'];
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps['txOptions'];
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>;
  width?: DimensionValue;
}

/**
 * A component that allows for the entering and editing of text.
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    labelTextProps,
    style: inputStyleOverride,
    containerStyle: containerStyleOverride,
    inputWrapperStyle: inputWrapperStyleOverride,
    width = '100%',
    ...textInputProps
  } = props;

  const { theme } = useTheme();
  const styles = getStyles(theme, { width });
  const input = useRef<TextInput>(null);

  const disabled = textInputProps.editable === false || status === 'disabled';

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder;

  const containerStyles = [containerStyleOverride, { width }];

  const labelStyles = [styles.label, labelTextProps?.style];

  const inputWrapperStyles = [
    styles.inputWrapper,
    status === 'error' && { borderColor: theme.colors.error },
    textInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    inputWrapperStyleOverride,
  ];

  const inputStyles: StyleProp<TextStyle> = [
    styles.input,
    disabled && { color: theme.colors.textDis },
    isRTL && { textAlign: 'right' as TextStyle['textAlign'] },
    textInputProps.multiline && { height: 'auto' },
    inputStyleOverride,
  ];

  const helperStyles = [
    styles.helper,
    status === 'error' && { color: theme.colors.error },
    HelperTextProps?.style,
  ];

  function focusInput() {
    if (disabled) return;

    input.current?.focus();
  }

  useImperativeHandle(ref, () => input.current as TextInput);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}>
      {!!(label || labelTx) && (
        <EnhancedText
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...labelTextProps}
          style={labelStyles}
        />
      )}

      <View style={inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={styles.leftAccessory}
            status={status}
            editable={!disabled}
            multiline={textInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          // underlineColorAndroid={theme.colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={theme.colors.textDis}
          {...textInputProps}
          editable={!disabled}
          style={inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={styles.rightAccessory}
            status={status}
            editable={!disabled}
            multiline={textInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!(helper || helperTx) && (
        <EnhancedText
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={helperStyles}
        />
      )}
    </TouchableOpacity>
  );
});

const getStyles = (theme: Theme, { width }: { width: DimensionValue | undefined }) =>
  StyleSheet.create({
    label: {
      marginBottom: theme.spacing.xs,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderWidth: theme.borders.medium,
      borderRadius: theme.borderRadius.xl,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.xxs,
      overflow: 'hidden',
      width,
    },
    input: {
      flex: 1,
      alignSelf: 'stretch',
      color: theme.colors.textPri,
      fontSize: 16,
      height: 24,
      // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
      paddingVertical: 0,
      paddingHorizontal: 0,
      marginVertical: theme.spacing.xs,
      marginHorizontal: theme.spacing.sm,
    },
    helper: {
      marginTop: theme.spacing.xs,
    },
    rightAccessory: {
      marginEnd: theme.spacing.xs,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftAccessory: {
      marginStart: theme.spacing.xs,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
