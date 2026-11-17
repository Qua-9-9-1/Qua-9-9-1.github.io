import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { preloadRoute } from '../../lib/routePreload';

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

const SmartLink: React.FC<SmartLinkProps> = ({ to, children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname + location.search + location.hash !== to) {
      navigate(to);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (props.onClick) props.onClick(e);
  };

  const preload = () => preloadRoute(to);

  return (
    <a
      href={`#${to}`}
      {...props}
      onClick={handleClick}
      onMouseEnter={(e) => {
        preload();
        props.onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        preload();
        props.onFocus?.(e);
      }}
      onTouchStart={(e) => {
        preload();
        props.onTouchStart?.(e);
      }}
    >
      {children}
    </a>
  );
};

export default SmartLink;
