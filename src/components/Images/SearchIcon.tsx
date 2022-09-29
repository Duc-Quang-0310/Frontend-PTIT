import React, { FC, SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  blockWidth?: number | string;
  blockHeight?: number | string;
  fill?: string;
}

export const SearchIcon: FC<LogoProps> = (props) => {
  const { blockHeight, blockWidth, fill = '#424242', ...other } = props;

  return (
    <svg
      width={blockWidth || '30'}
      height={blockHeight || '31'}
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        d="M26.25 26.75L20.8125 21.3125M23.75 14.25C23.75 19.7728 19.2728 24.25 13.75 24.25C8.22715 24.25 3.75 19.7728 3.75 14.25C3.75 8.72715 8.22715 4.25 13.75 4.25C19.2728 4.25 23.75 8.72715 23.75 14.25Z"
        stroke={fill}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
