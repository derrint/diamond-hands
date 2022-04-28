/* eslint-disable no-shadow */
import React from 'react';

import {Header, Footer} from '@templates';

// import Auth from '@data/local/Auth';

const MainLayout = (props) => {
  const {children, className} = props;

  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default MainLayout;
