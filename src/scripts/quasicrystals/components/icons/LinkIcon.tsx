
import React from 'react';

export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    {...props}
  >
    <path 
      fillRule="evenodd" 
      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-.879-.878A2 2 0 019.121 9.12l3-3zm-2.828 6.828a2 2 0 00-2.828 0l-3 3a2 2 0 002.828 2.828l3-3a2 2 0 000-2.828l-.879-.878a2 2 0 00-2.828-.001z" 
      clipRule="evenodd" 
    />
    <path d="M11.364 7.636a.75.75 0 011.06 0l2.5 2.5a.75.75 0 01-1.06 1.06l-2.5-2.5a.75.75 0 010-1.06zM8.636 12.364a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 011.06-1.06l2.5 2.5a.75.75 0 010 1.06z" />
  </svg>
);
