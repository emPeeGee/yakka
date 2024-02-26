import React from 'react';

import { Path, Svg, SvgProps } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export const CompassIcon = (props: SvgProps) => {
  const { theme } = useTheme();

  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M16 4C13.6266 4 11.3066 4.70379 9.33316 6.02236C7.35977 7.34094 5.8217 9.21509 4.91345 11.4078C4.0052 13.6005 3.76756 16.0133 4.23058 18.3411C4.6936 20.6689 5.83649 22.8071 7.51472 24.4853C9.19295 26.1635 11.3312 27.3064 13.6589 27.7694C15.9867 28.2324 18.3995 27.9948 20.5922 27.0866C22.7849 26.1783 24.6591 24.6402 25.9776 22.6668C27.2962 20.6935 28 18.3734 28 16C28 12.8174 26.7357 9.76515 24.4853 7.51472C22.2348 5.26428 19.1826 4 16 4ZM18 18L10 22L14 14L22 10L18 18Z"
        fill={theme.colors.primary200}
      />
      <Path
        d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM16 27C13.8244 27 11.6977 26.3549 9.88873 25.1462C8.07979 23.9375 6.66989 22.2195 5.83733 20.2095C5.00477 18.1995 4.78693 15.9878 5.21137 13.854C5.63581 11.7202 6.68345 9.7602 8.22183 8.22183C9.76021 6.68345 11.7202 5.6358 13.854 5.21136C15.9878 4.78692 18.1995 5.00476 20.2095 5.83733C22.2195 6.66989 23.9375 8.07979 25.1462 9.88873C26.3549 11.6977 27 13.8244 27 16C26.9967 18.9164 25.8367 21.7123 23.7745 23.7745C21.7123 25.8367 18.9164 26.9967 16 27ZM21.5525 9.105L13.5525 13.105C13.3591 13.2022 13.2022 13.3591 13.105 13.5525L9.10501 21.5525C9.02869 21.705 8.99264 21.8745 9.0003 22.0449C9.00795 22.2153 9.05905 22.3808 9.14874 22.5259C9.23843 22.671 9.36373 22.7907 9.51272 22.8736C9.66172 22.9566 9.82946 23.0001 10 23C10.1552 22.9998 10.3084 22.9638 10.4475 22.895L18.4475 18.895C18.6409 18.7978 18.7979 18.6409 18.895 18.4475L22.895 10.4475C22.9894 10.2597 23.0222 10.0469 22.9887 9.83933C22.9552 9.6318 22.8572 9.4401 22.7085 9.29146C22.5599 9.14282 22.3682 9.0448 22.1607 9.01132C21.9531 8.97785 21.7403 9.01063 21.5525 9.105ZM17.25 17.25L12.2363 19.7638L14.75 14.75L19.7688 12.2413L17.25 17.25Z"
        fill={theme.colors.tabColor}
      />
    </Svg>
  );
};