import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    children: React.ReactNode;
}

const SmartLink: React.FC<SmartLinkProps> = ({ to, children, ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (
            (location.pathname + location.search + location.hash) === to
        ) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            e.preventDefault();
            navigate(to);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        if (props.onClick) props.onClick(e);
    };

    return (
        <a href={to} {...props} onClick={handleClick}>
            {children}
        </a>
    );
};

export default SmartLink;