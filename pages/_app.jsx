import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import {Provider} from 'overmind-react';
import NProgress from 'nprogress';
import 'tailwindcss/tailwind.css';

import {store} from '@overmind/index';
import {ProtectRoute} from '@context/Authentication';
import {SDKProvider} from '@context/SDK';
import {Toast} from '@elements';
import '@styles/index.scss';

export default class MyApp extends App {
  componentDidMount() {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('660898915220837');
        ReactPixel.pageView();

        Router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView();
        });
      });
  }

  render() {
    const {Component, pageProps} = this.props;

    Router.onRouteChangeStart = () => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
    
    return (
      <Provider value={store}>
        <SDKProvider>
          <ProtectRoute>
            <Head>
              <title>Diamond Hands</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="icon" href="/images/favicon-2.png" />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
              />
            </Head>
            {/* <Script id="show-banner" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '660898915220837');
                fbq('track', 'PageView');
              `,
              }}
            /> */}
            {/* <FBPixel /> */}
            <Toast />
            <div id="main-component">
              <Component {...pageProps} />
            </div>
          </ProtectRoute>
        </SDKProvider>
      </Provider>
    );
  }
}
