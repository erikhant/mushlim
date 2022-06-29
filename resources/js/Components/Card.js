import React from 'react';

const Card = ({id = null, children}) => {
  return (
    <div id={id} className="border border-secondary-light bg-ui text-secondary-dark text-xs sm:text-sm md:text-base rounded mb-4">
        { children }
    </div>
  )
}

const Body = ({children}) => {
    return (
        <div className="leading-normal sm:leading-relaxed p-5 pb-3 sm:p-6">
            { children }
        </div>
    );
}

const Header = ({children}) => {
    return (
        <div className="flex space-x-3 border-b border-b-secondary-light px-5 py-1.5">
            { children }
        </div>
    );
}

const Footer = ({children}) => {
    return (
        <div className="flex space-x-3 border-t border-t-secondary-light sm:px-3 md:px-5 py-1.5">
            { children }
        </div>
    );
}

Card.Body = Body;
Card.Header = Header;
Card.Footer = Footer;

export default Card;