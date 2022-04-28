import React from 'react';
import {useRouter} from 'next/router';

import {SectionStatus} from '@sections/pagePayment';

const PaymentSuccess = () => {
  const router = useRouter();
  const {status} = router.query;

  return (
    <SectionStatus status={status} title={status === 'success' ? '3DS Payment Completed' : '3DS Payment Failed'} />
  );
};

export default PaymentSuccess;
