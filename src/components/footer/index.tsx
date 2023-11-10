import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  console.log(location.pathname);

  const [currentPath, setCurrentPath] = useState<string>('');
  const [isFooterHidden, hideFooter] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.includes('resume-builder')) {
      hideFooter(true);
    }
  }, [currentPath]);

  return (
    <>
      {
        isFooterHidden ? '' : <div>Footer</div>
      }
    </>
  );
};

export default Footer;