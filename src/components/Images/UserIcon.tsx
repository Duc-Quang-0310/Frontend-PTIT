import React, { FC, SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  blockWidth?: number | string;
  blockHeight?: number | string;
  fill?: string;
}

const UserIcon: FC<LogoProps> = (props) => {
  const { blockHeight, blockWidth, fill = '#424242', ...other } = props;

  return (
    <svg
      width={blockHeight || '30'}
      height={blockWidth || '31'}
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        d="M25 26.75V24.25C25 22.9239 24.4732 21.6521 23.5355 20.7145C22.5979 19.7768 21.3261 19.25 20 19.25H10C8.67392 19.25 7.40215 19.7768 6.46447 20.7145C5.52678 21.6521 5 22.9239 5 24.25V26.75"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 14.25C17.7614 14.25 20 12.0114 20 9.25C20 6.48858 17.7614 4.25 15 4.25C12.2386 4.25 10 6.48858 10 9.25C10 12.0114 12.2386 14.25 15 14.25Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
