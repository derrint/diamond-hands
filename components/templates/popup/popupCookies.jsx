import React from 'react';

import {Button} from '@elements';
import IconCokies from '@images/icon/icon-cookies.png';
// import IconHandGuide from '@images/icon/icon-hand-guide.png';

const PopUpOnBoarding = ({acceptAction}) => (
  <div className="cookies">
    <div className="container gap-4">
      <div className="flex flex-row gap-3 justify-center items-center">
        <img src={IconCokies} width="20px" />
        <h1>Cookies</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <span>By continuing browse this website, you agree to use analytical cookies to collect website visit statistics.</span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Button onClick={() => acceptAction()} className="is-blue-light is-extra-small is-rounded is-semibold"><span className="txt-btn">OK</span></Button>
      </div>
    </div>
  </div>
);

export default PopUpOnBoarding;
