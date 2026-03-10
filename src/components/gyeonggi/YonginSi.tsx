import * as React from "react";

export const YonginSi = (props: React.SVGProps<SVGSVGElement>) => {
  const id = React.useId();
  return (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.89 30.45" {...props}>
    <defs>
      <linearGradient
        id={`${id}-a`}
        x1="12.97"
        x2="12.93"
        y1="22.12"
        y2=".37"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#c82f8b" />
        <stop offset=".29" stopColor="#c82f8b" />
        <stop offset=".48" stopColor="#be2789" />
        <stop offset=".81" stopColor="#a41485" />
        <stop offset="1" stopColor="#920783" />
      </linearGradient>
      <linearGradient
        id={`${id}-b`}
        x1="12.95"
        x2="12.95"
        y1="30.56"
        y2="17.13"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#69b995" />
        <stop offset=".2" stopColor="#42b495" />
        <stop offset=".47" stopColor="#12ae96" />
        <stop offset=".6" stopColor="#00ac97" />
      </linearGradient>
      <linearGradient
        id={`${id}-c`}
        x1="12.98"
        x2="12.94"
        y1="22.12"
        y2=".37"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#c82f8b" />
        <stop offset=".29" stopColor="#c82f8b" />
        <stop offset=".48" stopColor="#be2789" />
        <stop offset=".81" stopColor="#a41485" />
        <stop offset="1" stopColor="#920783" />
      </linearGradient>
    </defs>
    <path
      d="M19.83 9.14c-.43 0-.78.32-.83.74-.37 3.01-2.93 5.35-6.05 5.35S7.27 12.9 6.9 9.88a.84.84 0 0 0-.83-.74H.28c-.16 0-.28.12-.28.28.15 7.02 5.89 12.67 12.95 12.67S25.74 16.45 25.9 9.42c0-.16-.12-.28-.28-.28z"
      fill={`url(#${id}-a)`}
    />
    <circle cx="12.95" cy="23.6" r="6.85" fill={`url(#${id}-b)`} />
    <path
      d="M12.95 16.75c-2.69 0-5.01 1.55-6.13 3.8 1.83.98 3.91 1.54 6.13 1.54s4.31-.56 6.13-1.54a6.85 6.85 0 0 0-6.13-3.8"
      fill="#3b1e87"
    />
    <circle cx="12.95" cy="4.94" r="4.94" fill={`url(#${id}-c)`} />
  </svg>
  );
};

export default YonginSi;
