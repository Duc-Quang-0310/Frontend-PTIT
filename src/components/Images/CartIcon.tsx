import { FC, SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  blockWidth?: number | string;
  blockHeight?: number | string;
  fill?: string;
}

export const CartIcon: FC<LogoProps> = (props) => {
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
      <g clipPath="url(#clip0_1_153)">
        <path
          d="M11.25 28C11.9404 28 12.5 27.4404 12.5 26.75C12.5 26.0596 11.9404 25.5 11.25 25.5C10.5596 25.5 10 26.0596 10 26.75C10 27.4404 10.5596 28 11.25 28Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 28C25.6904 28 26.25 27.4404 26.25 26.75C26.25 26.0596 25.6904 25.5 25 25.5C24.3096 25.5 23.75 26.0596 23.75 26.75C23.75 27.4404 24.3096 28 25 28Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.25 1.75H6.25L9.6 18.4875C9.71431 19.063 10.0274 19.5799 10.4844 19.9479C10.9415 20.3158 11.5134 20.5112 12.1 20.5H24.25C24.8366 20.5112 25.4085 20.3158 25.8656 19.9479C26.3226 19.5799 26.6357 19.063 26.75 18.4875L28.75 8H7.5"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_153">
          <rect
            width="30"
            height="30"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
