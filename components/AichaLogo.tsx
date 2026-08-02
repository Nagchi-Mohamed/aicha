import React from 'react';

interface AichaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export const AichaLogo: React.FC<AichaLogoProps> = ({ 
  className = "w-10 h-10", 
  size = 22,
  showText = false,
  textClassName = "text-lg"
}) => {
  return (
    <div className="inline-flex items-center gap-3 group">
      {/* Brand Icon Badge */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0 ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Main Leaf Curve */}
          <path
            d="M16 4C11 9 8 15 8 21.5C8 25.0919 10.9081 28 14.5 28C18.5 28 22 25 24 20C24.5 18.7 23.5 17.5 22 17.5C20.5 17.5 19.5 18.5 19 19.5C18 21.5 16.5 23 14.5 23C12.8 23 11.5 21.7 11.5 20C11.5 15.5 14 11 18 7C19 6 18.5 4.5 17 4.2C16.6 4.1 16.3 4 16 4Z"
            fill="currentColor"
          />
          {/* Golden Natural Oil / Wellness Drop Accent */}
          <path
            d="M21 7C19.5 9 18.5 11.5 18.5 14C18.5 16.2091 20.2909 18 22.5 18C24.7091 18 26.5 16.2091 26.5 14C26.5 11.5 24.5 8.5 23 7C22.5 6.5 21.5 6.5 21 7Z"
            fill="#F59E0B"
          />
          {/* Inner Leaf Vein */}
          <path
            d="M14.5 23C14.5 18 17 13 20 10"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-slate-900 leading-tight ${textClassName}`}>
            Aicha Wellness
          </span>
          <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest">
            Store Forever
          </span>
        </div>
      )}
    </div>
  );
};

export default AichaLogo;
