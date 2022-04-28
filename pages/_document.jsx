import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const renderPage = () => context.renderPage();

    const initialProps = await Document.getInitialProps({
      ...context,
      renderPage,
    });
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}
