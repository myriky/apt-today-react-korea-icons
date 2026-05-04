import * as React from "react";

export const Busan = (props: React.SVGProps<SVGSVGElement>) => {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 313.94 313.94"
    {...props}
  >
    <defs>
      <linearGradient
        id={`kicon-busan-a`}
        x1="8.83"
        x2="318.52"
        y1="341.35"
        y2="263.39"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".25" stopColor="#0087cc" />
        <stop offset=".8" stopColor="#662483" />
      </linearGradient>
      <linearGradient
        id={`kicon-busan-b`}
        x1="-11.31"
        x2="223.88"
        y1="42.97"
        y2="-34.56"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".2" stopColor="#e6007e" />
        <stop offset=".54" stopColor="#a61180" />
        <stop offset=".9" stopColor="#662483" />
      </linearGradient>
      <linearGradient
        id={`kicon-busan-c`}
        x1="1.48"
        x2="313.77"
        y1="91.56"
        y2="91.56"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".1" stopColor="#ed6ea7" />
        <stop offset=".21" stopColor="#eb5ba0" />
        <stop offset=".61" stopColor="#e71987" />
        <stop offset=".8" stopColor="#e6007e" />
      </linearGradient>
      <linearGradient
        id={`kicon-busan-d`}
        x1="-25.33"
        x2="183.44"
        y1="270.06"
        y2="140.55"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#662483" />
        <stop offset=".5" stopColor="#e6007e" />
        <stop offset=".58" stopColor="#e60580" />
        <stop offset=".69" stopColor="#e71686" />
        <stop offset=".81" stopColor="#e93290" />
        <stop offset=".94" stopColor="#eb589f" />
        <stop offset="1" stopColor="#ed6ea7" />
      </linearGradient>
      <linearGradient
        id={`kicon-busan-e`}
        x1="121.66"
        x2="145.65"
        y1="201.14"
        y2="117.78"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".15" stopColor="#878787" />
        <stop offset=".27" stopColor="#878787" stopOpacity={0.92} />
        <stop offset=".48" stopColor="#878787" stopOpacity={0.71} />
        <stop offset=".75" stopColor="#878787" stopOpacity={0.36} />
        <stop offset="1" stopColor="#878787" stopOpacity={0} />
      </linearGradient>
    </defs>
    <path
      d="M0 313.94h235.45l78.49-78.49-11.457-3.373L2.14 304.167Z"
      fill={`url(#kicon-busan-a)`}
    />
    <path
      d="M0 0v78.48l10.634 2.152L238.366 7.055 235.45 0Z"
      fill={`url(#kicon-busan-b)`}
    />
    <path
      d="M209.29 183.13 313.94 78.48 235.45 0 0 78.48l1.449 8.923 203.67 102.355Z"
      fill={`url(#kicon-busan-c)`}
    />
    <path d="M0 78.48v235.46l313.94-78.49L4.636 80.798Z" fill={`url(#kicon-busan-d)`} />
    <path
      d="M235.45 0 0 78.48l6.945 3.473L209.29 183.13 313.94 78.48Z"
      fill={`url(#kicon-busan-e)`}
      style={{ mixBlendMode: "multiply" }}
    />
  </svg>
  );
};

export default Busan;
