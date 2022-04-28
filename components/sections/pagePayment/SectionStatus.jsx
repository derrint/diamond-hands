import React from 'react';
import {useRouter} from 'next/router';

import {useActions} from '@overmind/index';

import Style from '@styles/page/pagePayment/sectionStatus.module.scss';
import IconSuccess from '@images/icon/icon-success.png';
import IconFailure from '@images/icon/icon-close-primary.png';

const SectionStatus = ({
  title, status,
}) => {
  const router = useRouter();
  const {paymentId} = router.query;

  const {getVerificationStatusCircle} = useActions();

  React.useEffect(() => {
    if (paymentId) {
      getVerificationStatusCircle({paymentId});
    }
  });

  return (
    <section className={`text-center ${Style.section__status}`}>
      <div className={`container mx-auto ${Style.container}`}>
        <div className={`flex justify-center ${Style.banner}`}>
          {status === 'success' ? (
            <img className={`${Style.icon}`} src={IconSuccess} />
          ) : (
            <img className={`${Style.icon}`} src={IconFailure} />
          )}
        </div>
        <h1>{title}</h1>
        <span className={Style.text}>
          You may close this window
        </span>
      </div>
    </section>
  );
};

export default SectionStatus;
