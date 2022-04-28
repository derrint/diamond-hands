/* eslint-disable no-shadow */
import React from 'react';
import {toast} from 'react-toastify';

import {SDKContext} from '@context/SDK';
import {Config} from '@constant';
import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';

/* import images */
import Logo from '@images/logo/logo-diamond-hands-2x.png';

const FormLogin = ({title}) => {
  const {loginAction} = useState();
  const [email, setEmail] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  // const [password, setPassword] = React.useState(null);

  const {nftlabs, allowanceAmount} = React.useContext(SDKContext);

  const {
    login,
    accountCheck,
    showModal,
    hideModal,
    setLoginAction,
    getinboxUnreadCount,
  } = useActions();

  // ----- importing SDK contexts -----
  const {
    magic, bridge, signer,
  } = React.useContext(SDKContext);

  const handleLogin = async () => {
    await accountCheck({email, mode: 'login'});
    const didToken = await magic.auth.loginWithMagicLink({email});
    await login({email, didToken});
    if (Config.IS_DEV === 'true') {
      try {
        // update the signer on thirdweb sdk
        bridge.setProviderOrSigner(signer);
  
        // ----- get currency module -----
        const currency = nftlabs.getCurrencyModule(Config.currencyAddressDD);
        const currencyUSDC = nftlabs.getCurrencyModule(Config.currencyAddressUSDC);
  
        // ----- set allowance -----
        await currency.setAllowance(Config.minter1Address, allowanceAmount);
        await currencyUSDC.setAllowance(Config.minter1Address, allowanceAmount);
  
        // ----- get allowance, for checking purpose only -----
        const allowance = await currency.allowance(Config.adminAddress);
        const allowanceUSDC = await currencyUSDC.allowance(Config.adminAddress);
        console.log(`allowance = ${allowance}`);
        console.log(`allowance USDC = ${allowanceUSDC}`);
  
        // return 'OK';
      } catch (error) {
        console.log(`something went wrong = ${error}`);
        // return Promise.reject(error);
      }
    }
  };

  const doLogin = async () => {
    if (email) {
      toast.promise(
        handleLogin(),
        {
          pending: {
            render() {
              return 'Logging you in';
            },
          },
          success: {
            render() {
              setLoginAction({enable: false, action_text: ''});
              getinboxUnreadCount();
              // Router.reload(window.location.pathname);
              hideModal();
              return 'Successfully logged in!';
            },
          },
          error: {
            render({data}) {
              setIsError(true);
              // console.log('data = ', data);
              setErrorMessage(data.error);
              return data.error || data.reason || 'Oops, please try again in a few moments.';
            },
            autoClose: false,
          },
        },
      );
    } else {
      toast.warn('Please fill up the form');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doLogin();
    }
  };
  const showRegisterModal = (e) => {
    e.preventDefault();
    showModal('register');
  };

  const formTitle = title ?? 'Log in';

  return (
    <div className="p-8">
      <img className="mx-auto logo mb-5" src={Logo} />
      {loginAction.enable && (
        <div className="flex justify-center mt-5">
          <span className="info-action-txt">
            You need to login to
            {' '}
            {loginAction.action_text}
          </span>
        </div>
      )}
      <h2 className="text-center my-5 text-3xl font-g8 font-bold text-secondary-blue-75">{formTitle}</h2>
      <form className="form__login">
        <div className="form-control mb-5">
          <input
            className="outline-none"
            type="email"
            name="email"
            placeholder="Email"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setIsError(false);
              setEmail(e.target.value);
            }}
          />
          {isError && (
            <div className="flex justify-center">
              <span className="error-message-login">{errorMessage}</span>
            </div>
          )}
        </div>
        {/* <div className="form-control mb-5">
          <input className="outline-none" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div> */}

        <div className="form-control mb-20">
          <Button
            className="is-blue is-rounded is-semibold"
            onClick={doLogin}
          >
            Login
          </Button>
        </div>
        <p className="info text-center">
          Don’t have an account?
          {' '}
          <a href="#" onClick={showRegisterModal}>Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default FormLogin;
