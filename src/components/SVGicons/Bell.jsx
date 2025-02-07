import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Bell = ({ fill = "#000" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const themeKeys = useSelector((state) => state.localization.themeKeys);

  // Optional: Log themeKeys to check its structure
  console.log("Theme Keys:", themeKeys);

  return (
    <svg
      width="19"
      height="26"
      viewBox="0 0 19 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path
        d="M16.0996 14.0244V11.656C16.1004 10.0552 15.5737 8.50103 14.6045 7.24462C13.6353 5.98822 12.2803 5.1031 10.7587 4.73238C10.7703 4.68646 10.7793 4.63989 10.7857 4.59291V1.48243C10.7857 1.13346 10.6503 0.798792 10.4091 0.552037C10.168 0.305282 9.84099 0.166656 9.5 0.166656C9.15901 0.166656 8.83198 0.305282 8.59086 0.552037C8.34974 0.798792 8.21429 1.13346 8.21429 1.48243V4.59291C8.22068 4.63989 8.2297 4.68646 8.24129 4.73238C6.71966 5.1031 5.3647 5.98822 4.39551 7.24462C3.42632 8.50103 2.89957 10.0552 2.90043 11.656V14.0244C2.90043 17.1638 0.5 17.948 0.5 19.5177C0.5 20.298 0.5 21.0874 1.19171 21.0874H17.8083C18.5 21.0874 18.5 20.298 18.5 19.5177C18.5 17.948 16.0996 17.1638 16.0996 14.0244ZM5.41529 22.4032C5.75636 23.2229 6.32543 23.922 7.0517 24.4133C7.77797 24.9047 8.62937 25.1667 9.5 25.1667C10.3706 25.1667 11.222 24.9047 11.9483 24.4133C12.6746 23.922 13.2436 23.2229 13.5847 22.4032H5.41529Z"
        fill={isHovered ? themeKeys?.darkHover || "#000" : fill}
        style={{ transition: "fill 0.3s ease" }}
      />
    </svg>
  );
};
