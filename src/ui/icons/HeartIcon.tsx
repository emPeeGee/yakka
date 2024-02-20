import React from 'react';

import { Path, Svg, SvgProps } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export const HeartIcon = (props: SvgProps) => {
  const { theme } = useTheme();
  const fill = props.fill || theme.colors.secondary500;

  return (
    <Svg width="32" height="32" viewBox="0 0 26 26" fill="none" {...props}>
      <Path
        opacity="0.2"
        d="M23.5625 9.54688C23.5625 16.25 13 21.9375 13 21.9375C13 21.9375 2.4375 16.25 2.4375 9.54688C2.4375 8.09233 3.01532 6.69736 4.04384 5.66884C5.07236 4.64032 6.46733 4.0625 7.92188 4.0625C10.2162 4.0625 12.1814 5.31273 13 7.3125C13.8186 5.31273 15.7838 4.0625 18.0781 4.0625C19.5327 4.0625 20.9276 4.64032 21.9562 5.66884C22.9847 6.69736 23.5625 8.09233 23.5625 9.54688Z"
        fill={fill}
      />
      <Path
        d="M18.0781 3.25C15.9809 3.25 14.1446 4.15187 13 5.67633C11.8554 4.15187 10.0191 3.25 7.92188 3.25C6.25242 3.25188 4.65188 3.9159 3.47139 5.09639C2.2909 6.27688 1.62688 7.87742 1.625 9.54688C1.625 16.6562 12.1662 22.4108 12.6151 22.6484C12.7334 22.7121 12.8656 22.7454 13 22.7454C13.1344 22.7454 13.2666 22.7121 13.3849 22.6484C13.8338 22.4108 24.375 16.6562 24.375 9.54688C24.3731 7.87742 23.7091 6.27688 22.5286 5.09639C21.3481 3.9159 19.7476 3.25188 18.0781 3.25ZM13 21.0031C11.1455 19.9225 3.25 14.9998 3.25 9.54688C3.25161 8.30831 3.74434 7.12094 4.62014 6.24514C5.49594 5.36934 6.68331 4.87661 7.92188 4.875C9.89727 4.875 11.5558 5.92719 12.2484 7.61719C12.3097 7.76621 12.4138 7.89367 12.5476 7.98337C12.6814 8.07307 12.8389 8.12096 13 8.12096C13.1611 8.12096 13.3186 8.07307 13.4524 7.98337C13.5862 7.89367 13.6903 7.76621 13.7516 7.61719C14.4442 5.92414 16.1027 4.875 18.0781 4.875C19.3167 4.87661 20.5041 5.36934 21.3799 6.24514C22.2557 7.12094 22.7484 8.30831 22.75 9.54688C22.75 14.9916 14.8525 19.9215 13 21.0031Z"
        fill={fill}
      />
    </Svg>
  );
};