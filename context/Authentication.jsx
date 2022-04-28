/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

import {useActions, useState} from '@overmind/index';

const ProtectRoute = ({children}) => {
  const {loadApp, hideModal} = useActions();
  const {auth} = useState();
  
  const router = useRouter();

  const authRoute = (authObj, paths) => {
    // ----- prevent routing for some cases -----
    if (authObj.isLoggedIn === false && paths.includes(router.pathname)) {
      document.getElementById('main-component').style.filter = 'blur(8px)';
      
      setTimeout(() => {
        toast.error('You need to login to see this page.');
      
        setTimeout(() => {
          router.push('/');
          document.getElementById('main-component').style.filter = 'none';
        }, 2000);
      }, 200);
    }
  };

  const protectedRoutes = ['/profile'];

  React.useEffect(async () => {
    const authLoadApp = await loadApp();
    authRoute(authLoadApp, protectedRoutes);

    return () => {};
  }, []);

  React.useEffect(async () => {
    authRoute(auth, protectedRoutes);

    return () => {};
  }, [auth, router.pathname]);

  React.useEffect(async () => {
    hideModal();

    return () => {};
  }, [router.pathname]);

  return children;
};

export {ProtectRoute};
