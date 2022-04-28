/* eslint-disable no-shadow */
import React from 'react';

import {FooterError} from '@templates';

// import Auth from '@data/local/Auth';

const MainLayout = (props) => {
  const {children, className} = props;

  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      {children}
      <FooterError />
    </div>
  );
};

export default MainLayout;
