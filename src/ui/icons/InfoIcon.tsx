import { Path, Svg, SvgProps } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export const InfoIcon = (props: SvgProps) => {
  const { theme } = useTheme();

  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        opacity="0.2"
        d="M28 16C28 18.3734 27.2962 20.6935 25.9776 22.6668C24.6591 24.6402 22.7849 26.1783 20.5922 27.0866C18.3995 27.9948 15.9867 28.2324 13.6589 27.7694C11.3312 27.3064 9.19295 26.1635 7.51472 24.4853C5.83649 22.8071 4.6936 20.6689 4.23058 18.3411C3.76756 16.0133 4.0052 13.6005 4.91345 11.4078C5.8217 9.21509 7.35977 7.34094 9.33316 6.02236C11.3066 4.70379 13.6266 4 16 4C19.1826 4 22.2348 5.26428 24.4853 7.51472C26.7357 9.76515 28 12.8174 28 16Z"
        fill={props.color || theme.colors.base0}
      />
      <Path
        d="M18 22C18 22.2652 17.8946 22.5196 17.7071 22.7071C17.5196 22.8946 17.2652 23 17 23C16.4696 23 15.9609 22.7893 15.5858 22.4142C15.2107 22.0391 15 21.5304 15 21V16C14.7348 16 14.4804 15.8946 14.2929 15.7071C14.1054 15.5196 14 15.2652 14 15C14 14.7348 14.1054 14.4804 14.2929 14.2929C14.4804 14.1054 14.7348 14 15 14C15.5304 14 16.0391 14.2107 16.4142 14.5858C16.7893 14.9609 17 15.4696 17 16V21C17.2652 21 17.5196 21.1054 17.7071 21.2929C17.8946 21.4804 18 21.7348 18 22ZM29 16C29 18.5712 28.2376 21.0846 26.8091 23.2224C25.3807 25.3603 23.3503 27.0265 20.9749 28.0104C18.5995 28.9944 15.9856 29.2518 13.4638 28.7502C10.9421 28.2486 8.6257 27.0105 6.80762 25.1924C4.98953 23.3743 3.75141 21.0579 3.2498 18.5362C2.74819 16.0144 3.00563 13.4006 3.98957 11.0251C4.97351 8.64968 6.63975 6.61935 8.77759 5.1909C10.9154 3.76244 13.4288 3 16 3C19.4467 3.00364 22.7512 4.37445 25.1884 6.81163C27.6256 9.24882 28.9964 12.5533 29 16ZM27 16C27 13.8244 26.3549 11.6977 25.1462 9.88873C23.9375 8.07979 22.2195 6.66989 20.2095 5.83733C18.1995 5.00476 15.9878 4.78692 13.854 5.21136C11.7202 5.6358 9.76021 6.68345 8.22183 8.22183C6.68345 9.7602 5.63581 11.7202 5.21137 13.854C4.78693 15.9878 5.00477 18.1995 5.83733 20.2095C6.66989 22.2195 8.07979 23.9375 9.88873 25.1462C11.6977 26.3549 13.8244 27 16 27C18.9164 26.9967 21.7123 25.8367 23.7745 23.7745C25.8367 21.7123 26.9967 18.9164 27 16ZM15.5 12C15.7967 12 16.0867 11.912 16.3334 11.7472C16.58 11.5824 16.7723 11.3481 16.8858 11.074C16.9994 10.7999 17.0291 10.4983 16.9712 10.2074C16.9133 9.91639 16.7704 9.64912 16.5607 9.43934C16.3509 9.22956 16.0836 9.0867 15.7926 9.02882C15.5017 8.97094 15.2001 9.00065 14.926 9.11418C14.6519 9.22771 14.4176 9.41997 14.2528 9.66665C14.088 9.91332 14 10.2033 14 10.5C14 10.8978 14.158 11.2794 14.4393 11.5607C14.7206 11.842 15.1022 12 15.5 12Z"
        fill={props.color || theme.colors.base0}
      />
    </Svg>
  );
};