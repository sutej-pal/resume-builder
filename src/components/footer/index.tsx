import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  console.log(location.pathname);

  if (location.pathname.includes('resume-builder')) {
    return null
  }

  return (
    <div>Footer</div>
  );
};

export default Footer;