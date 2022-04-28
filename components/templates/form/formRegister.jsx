/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import Link from 'next/link';

import {SDKContext} from '@context/SDK';
import {Config} from '@constant';
import {useActions} from '@overmind/index';
import {Button} from '@elements';

/* import images */
import Logo from '@images/logo/logo-diamond-hands-2x.png';

const FormRegister = ({title}) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState(null);

  const {nftlabs, allowanceAmount} = React.useContext(SDKContext);

  const {
    register, login, showModal, hideModal, accountCheck,
  } = useActions();

  // ----- importing SDK contexts -----
  const {magic} = React.useContext(SDKContext);

  const handleRegister = async () => {
    await accountCheck({email});
    const didToken = await magic.auth.loginWithMagicLink({email});
    await register({username, didToken});
    await login({email, didToken});

    if (Config.IS_DEV === 'true') {
      try {
      // ----- get currency module -----
        const currency = nftlabs.getCurrencyModule(Config.currencyAddressDD);
        const currencyUSDC = nftlabs.getCurrencyModule(Config.currencyAddressUSDC);

        // ----- set allowance -----
        await currency.setAllowance(Config.minter1Address, allowanceAmount);
        await currencyUSDC.setAllowance(Config.minter1Address, allowanceAmount);

        // ----- get allowance, for checking purpose only -----
        const allowance = await currency.allowance(Config.adminAddress);
        console.log(`allowance = ${allowance}`);

      // return 'OK';
      } catch (error) {
      // return Promise.reject(error);
      }
    }
  };

  const doRegister = async () => {
    // if (password === confirmPassword) {
    if (username && email) {
      toast.promise(
        handleRegister(),
        {
          pending: {
            render() {
              return 'Creating your account';
            },
          },
          success: {
            render() {
              // Router.reload(window.location.pathname);
              // showModal('login');
              hideModal();
              setTimeout(() => {
                showModal('onboarding-popup');
              }, 500);

              // ----- add FB Pixel tracking -----
              import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                  const payload = {
                    username,
                    email,
                  };
                  ReactPixel.track('CompleteRegistration', {
                    ...payload,
                    content_name: payload.username,
                    status: 'success',
                    value: payload.email,
                  });
                });
              
              return 'Registration success.';
            },
          },
          error: {
            render({data}) {
              return data.error || 'Oops, please try again in a few moments.';
            },
            autoClose: false,
          },
        },
      );
    } else {
      toast.warn('Please fill up the form');
    }
    // } else {
    //   toast.error('Invalid confirm password, confirm password must same with password');
    // }
  };

  const showLoginModal = (e) => {
    e.preventDefault();
    showModal('login');
  };

  const formTitle = title ?? 'Create account';

  return (
    <div className="p-8">
      <img className="mx-auto logo" src={Logo} />
      <h2 className="text-center my-10 text-3xl font-g8 font-bold text-secondary-blue-75">{formTitle}</h2>
      
      <form className="form__login">
        <div className="form-control mb-5">
          <input className="outline-none" type="text" name="name" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-control mb-5">
          <input className="outline-none" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        {/* <div className="form-control mb-5">
          <input className="outline-none" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-control mb-5">
          <input className="outline-none" type="password" name="confirm-password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div> */}
        <div className="form-control mb-20">
          <Button
            className="is-blue is-rounded is-semibold"
            onClick={doRegister}
          >
            Sign up
          </Button>
        </div>
        <p className="info__description text-center mb-10">
          By registering you agreed to our
          {' '}
          <br />
          <Link href="/term-of-condition">Term &amp; Condition</Link>
          {' '}
          and
          {' '}
          <Link href="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
        <p className="info text-center">
          Already have an account?
          {' '}
          <a href="#" onClick={showLoginModal}>Log in</a>
        </p>
        
      </form>
    </div>
  );
};

export default FormRegister;
