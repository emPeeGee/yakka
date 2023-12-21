import React from 'react';

import { Path, Svg, SvgProps, Circle } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export const SettingsIcon = (props: SvgProps) => {
  const { theme } = useTheme();

  return (
    <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
      <Circle cx="18.5" cy="18.5" r="18.5" fill={theme.colors.primary80} />
      <Path
        opacity="0.2"
        d="M26.8753 16.9217L24.2626 15.4337C24.2101 15.3385 24.1551 15.2458 24.0985 15.1539L24.0887 12.2008C23.263 11.504 22.3131 10.9693 21.289 10.625L18.664 12.0925C18.554 12.0925 18.4433 12.0925 18.3358 12.0925L15.7108 10.625C14.687 10.9705 13.7377 11.5062 12.9127 12.2041L12.8996 15.1572C12.8422 15.2491 12.7872 15.3426 12.7356 15.437L10.1237 16.9217C9.91776 17.9633 9.91776 19.0351 10.1237 20.0766L12.7364 21.5647C12.7889 21.6598 12.8438 21.7525 12.9004 21.8444L12.9103 24.7975C13.7361 25.4951 14.6863 26.0303 15.7108 26.375L18.3358 24.9091C18.4457 24.9091 18.5565 24.9091 18.664 24.9091L21.289 26.375C22.3119 26.0293 23.2604 25.4935 24.0846 24.7959L24.0977 21.8428C24.1551 21.7509 24.2101 21.6574 24.2618 21.563L26.8736 20.0783C27.0803 19.0363 27.0809 17.9639 26.8753 16.9217ZM18.4999 21.7812C17.8509 21.7812 17.2165 21.5888 16.6769 21.2283C16.1373 20.8677 15.7168 20.3553 15.4684 19.7557C15.2201 19.1561 15.1551 18.4964 15.2817 17.8599C15.4083 17.2234 15.7208 16.6387 16.1797 16.1798C16.6386 15.7209 17.2232 15.4084 17.8597 15.2818C18.4962 15.1552 19.156 15.2202 19.7556 15.4685C20.3551 15.7169 20.8676 16.1374 21.2281 16.677C21.5887 17.2166 21.7811 17.851 21.7811 18.5C21.7811 19.3702 21.4354 20.2048 20.8201 20.8202C20.2047 21.4355 19.3701 21.7812 18.4999 21.7812Z"
        fill="white"
      />
      <Path
        d="M18.5 14.5622C17.7212 14.5622 16.9599 14.7932 16.3124 15.2258C15.6649 15.6585 15.1602 16.2734 14.8622 16.9929C14.5642 17.7124 14.4862 18.5041 14.6381 19.2679C14.7901 20.0317 15.1651 20.7333 15.7157 21.284C16.2664 21.8346 16.968 22.2097 17.7318 22.3616C18.4956 22.5135 19.2873 22.4355 20.0068 22.1375C20.7263 21.8395 21.3412 21.3348 21.7739 20.6873C22.2065 20.0398 22.4375 19.2785 22.4375 18.4997C22.4364 17.4558 22.0212 16.4549 21.283 15.7167C20.5448 14.9785 19.5439 14.5633 18.5 14.5622ZM18.5 21.1247C17.9808 21.1247 17.4733 20.9708 17.0416 20.6823C16.6099 20.3939 16.2735 19.9839 16.0748 19.5043C15.8761 19.0246 15.8241 18.4968 15.9254 17.9876C16.0267 17.4784 16.2767 17.0107 16.6438 16.6436C17.0109 16.2765 17.4787 16.0265 17.9879 15.9252C18.4971 15.8239 19.0249 15.8759 19.5045 16.0746C19.9842 16.2732 20.3941 16.6097 20.6826 17.0414C20.971 17.473 21.125 17.9806 21.125 18.4997C21.125 19.1959 20.8484 19.8636 20.3561 20.3559C19.8638 20.8482 19.1962 21.1247 18.5 21.1247ZM27.5185 16.7943C27.5002 16.7019 27.4622 16.6145 27.4072 16.5381C27.3521 16.4616 27.2813 16.3979 27.1994 16.3513L24.7524 14.9568L24.7426 12.1989C24.7423 12.1039 24.7213 12.0102 24.6813 11.924C24.6412 11.8379 24.5829 11.7616 24.5104 11.7002C23.6228 10.9493 22.6006 10.3739 21.4982 10.0046C21.4114 9.9752 21.3194 9.96433 21.2281 9.97266C21.1369 9.981 21.0483 10.0084 20.9683 10.053L18.5 11.4327L16.0292 10.0505C15.9491 10.0056 15.8605 9.97808 15.769 9.9696C15.6776 9.96112 15.5854 9.97192 15.4984 10.0013C14.3967 10.373 13.3757 10.9507 12.4895 11.7035C12.4172 11.7647 12.3589 11.841 12.3189 11.927C12.2788 12.0129 12.2578 12.1065 12.2574 12.2014L12.2451 14.9617L9.7981 16.3563C9.71623 16.4029 9.64536 16.4666 9.5903 16.543C9.53524 16.6194 9.49728 16.7068 9.479 16.7992C9.25505 17.9246 9.25505 19.0831 9.479 20.2085C9.49728 20.3009 9.53524 20.3883 9.5903 20.4647C9.64536 20.5411 9.71623 20.6048 9.7981 20.6514L12.2451 22.046L12.2549 24.8047C12.2552 24.8996 12.2761 24.9934 12.3162 25.0795C12.3563 25.1656 12.4146 25.242 12.4871 25.3034C13.3747 26.0542 14.3969 26.6296 15.4993 26.999C15.5861 27.0284 15.6781 27.0393 15.7694 27.0309C15.8606 27.0226 15.9491 26.9952 16.0292 26.9506L18.5 25.5667L20.9708 26.949C21.0685 27.0034 21.1787 27.0317 21.2907 27.031C21.3623 27.031 21.4335 27.0193 21.5015 26.9965C22.6029 26.625 23.6239 26.0479 24.5104 25.296C24.5828 25.2347 24.641 25.1585 24.6811 25.0725C24.7212 24.9866 24.7421 24.8929 24.7426 24.7981L24.7549 22.0377L27.2018 20.6432C27.2837 20.5966 27.3546 20.5329 27.4096 20.4565C27.4647 20.3801 27.5027 20.2927 27.521 20.2002C27.7437 19.0758 27.7428 17.9185 27.5185 16.7943ZM26.288 19.658L23.9444 20.991C23.8417 21.0494 23.7567 21.1344 23.6983 21.2371C23.6507 21.3192 23.6007 21.4061 23.5498 21.4881C23.4847 21.5916 23.45 21.7113 23.4497 21.8335L23.4374 24.479C22.8075 24.9737 22.1057 25.3693 21.3563 25.652L18.9922 24.3346C18.894 24.2803 18.7836 24.2521 18.6714 24.2526H18.6558C18.5566 24.2526 18.4565 24.2526 18.3572 24.2526C18.2399 24.2497 18.1238 24.278 18.0209 24.3346L15.6551 25.6553C14.9041 25.3747 14.2004 24.9811 13.5683 24.488L13.5592 21.8466C13.5588 21.7241 13.5242 21.6042 13.4592 21.5004C13.4083 21.4184 13.3583 21.3364 13.3115 21.2494C13.2535 21.1452 13.1685 21.0584 13.0654 20.9984L10.7193 19.6621C10.5979 18.8942 10.5979 18.1119 10.7193 17.3439L13.0588 16.0085C13.1615 15.9501 13.2465 15.865 13.3049 15.7624C13.3525 15.6803 13.4026 15.5934 13.4534 15.5113C13.5185 15.4079 13.5532 15.2882 13.5535 15.166L13.5658 12.5205C14.1957 12.0258 14.8975 11.6302 15.6469 11.3474L18.0078 12.6649C18.1105 12.7218 18.2267 12.7501 18.3441 12.7469C18.4434 12.7469 18.5434 12.7469 18.6427 12.7469C18.7601 12.7501 18.8763 12.7218 18.979 12.6649L21.3448 11.3442C22.0958 11.6248 22.7995 12.0184 23.4317 12.5115L23.4407 15.1529C23.4411 15.2753 23.4758 15.3952 23.5408 15.499C23.5917 15.5811 23.6417 15.6631 23.6884 15.7501C23.7464 15.8543 23.8314 15.941 23.9345 16.0011L26.2806 17.3374C26.4037 18.1059 26.405 18.889 26.2847 19.658H26.288Z"
        fill="white"
      />
    </Svg>
  );
};
