import React from 'react';

import { Circle, Path, Svg, SvgProps } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export const ClockIcon = (props: SvgProps) => {
  const { theme } = useTheme();

  return (
    <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
      <Circle cx="18.5" cy="18.5" r="18.5" fill={props.color || theme.colors.info} />
      <Path
        opacity="0.2"
        d="M26.375 18.5C26.375 20.0575 25.9131 21.5801 25.0478 22.8751C24.1825 24.1702 22.9526 25.1795 21.5136 25.7756C20.0747 26.3716 18.4913 26.5275 16.9637 26.2237C15.4361 25.9198 14.0329 25.1698 12.9315 24.0685C11.8302 22.9671 11.0802 21.5639 10.7763 20.0363C10.4725 18.5087 10.6284 16.9253 11.2245 15.4864C11.8205 14.0474 12.8299 12.8175 14.1249 11.9522C15.4199 11.0869 16.9425 10.625 18.5 10.625C20.5886 10.625 22.5916 11.4547 24.0685 12.9315C25.5453 14.4084 26.375 16.4114 26.375 18.5Z"
        fill="white"
      />
      <Path
        d="M18.5 9.96875C16.8127 9.96875 15.1633 10.4691 13.7603 11.4065C12.3573 12.344 11.2639 13.6763 10.6182 15.2352C9.97245 16.7941 9.8035 18.5095 10.1327 20.1644C10.4619 21.8193 11.2744 23.3394 12.4675 24.5325C13.6606 25.7256 15.1807 26.5381 16.8356 26.8673C18.4905 27.1965 20.2059 27.0276 21.7648 26.3818C23.3237 25.7361 24.6561 24.6427 25.5935 23.2397C26.5309 21.8368 27.0313 20.1873 27.0313 18.5C27.0289 16.2381 26.1293 14.0695 24.5299 12.4701C22.9305 10.8707 20.7619 9.97114 18.5 9.96875ZM18.5 25.7188C17.0723 25.7188 15.6766 25.2954 14.4895 24.5022C13.3024 23.709 12.3771 22.5816 11.8307 21.2625C11.2844 19.9434 11.1414 18.492 11.42 17.0917C11.6985 15.6914 12.386 14.4051 13.3956 13.3956C14.4051 12.386 15.6914 11.6985 17.0917 11.42C18.492 11.1414 19.9434 11.2844 21.2625 11.8307C22.5816 12.3771 23.709 13.3024 24.5022 14.4895C25.2954 15.6766 25.7188 17.0723 25.7188 18.5C25.7166 20.4139 24.9553 22.2487 23.602 23.602C22.2487 24.9553 20.4139 25.7166 18.5 25.7188ZM23.75 18.5C23.75 18.674 23.6809 18.841 23.5578 18.964C23.4347 19.0871 23.2678 19.1562 23.0938 19.1562H18.5C18.326 19.1562 18.159 19.0871 18.036 18.964C17.9129 18.841 17.8438 18.674 17.8438 18.5V13.9062C17.8438 13.7322 17.9129 13.5653 18.036 13.4422C18.159 13.3191 18.326 13.25 18.5 13.25C18.6741 13.25 18.841 13.3191 18.964 13.4422C19.0871 13.5653 19.1563 13.7322 19.1563 13.9062V17.8438H23.0938C23.2678 17.8438 23.4347 17.9129 23.5578 18.036C23.6809 18.159 23.75 18.326 23.75 18.5Z"
        fill="white"
      />
    </Svg>
  );
};