// pages/404.js
import React from 'react';
import ErrorLayout from '@components/ErrorLayout';
import {Button} from '@elements';

const Custom404 = () => (
  <ErrorLayout>
    <div className="page-error-404 flex flex-grow relative justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img className="img mb-10" src="https://derrint.sirv.com/Images/diamond-hands/error-page/error-404.png" />
        <h1 className="mb-10">Page not found</h1>
        <span className="text-center mb-10">
          It looks you’re trying to access a page that either has been removed,
          <br />
          never been existed or temporarily unavailable.
        </span>
        <Button
          href="/"
          className="is-blue-light is-small is-rounded is-semibold"
        >
          Back to Home
        </Button>
      </div>
    </div>
  </ErrorLayout>
);

export default Custom404;
