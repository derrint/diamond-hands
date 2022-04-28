// pages/500.js
import React from 'react';
import ErrorLayout from '@components/ErrorLayout';

const Maintenance = () => (
  <ErrorLayout>
    <div className="page-error-maintenance flex flex-grow relative justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-10">Diamond Hands is under maintenance</h1>
        <span className="text-center">
          We’re on it and will be back in few minutes.
          <br />
          Follow us on
          {' '}
          <a className="link" href="https://twitter.com/DiamondHandsOFC" target="_blank" rel="noreferrer">Twitter</a>
          {' '}
          or join our
          {' '}
          <a className="link" href="https://discord.gg/G89yvGYefz" target="_blank" rel="noreferrer">Discord</a>
          {' '}
          for updates.
        </span>
        <div className="flex justify-center items-center mb-5">
          <img src="https://derrint.sirv.com/Images/diamond-hands/img-maintenance.png" alt="" width="600" />
        </div>
      </div>
    </div>
    {/* <div className="flex flex-col justify-center items-center">
      <h1>Diamond Hands is under maintenance</h1>
      <div className="flex justify-center items-center my-5">
        <span className="subtitle text-center">
          We’re on it and will be back in few minutes.
          <br />
          Follow us on
          <a className="link" href="https://twitter.com/DiamondHandsOFC" target="_blank" rel="noreferrer">Twitter</a>
          {' '}
          or join our
          {' '}
          <a className="link" href="https://discord.gg/G89yvGYefz" target="_blank" rel="noreferrer">Discord</a>
          {' '}
          for updates.
        </span>
      </div>
      <div className="flex justify-center items-center mb-5">
        <img src="https://derrint.sirv.com/Images/diamond-hands/img-maintenance.png" alt="" width="600" />
      </div>
    </div> */}
  </ErrorLayout>
);

export default Maintenance;
