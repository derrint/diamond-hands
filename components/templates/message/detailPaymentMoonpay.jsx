/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Button} from '@elements';
import {StepProgress} from '@modules';
import IconArrowRight from '@images/icon/icon-arrow-right.png';
import IconCircleGreen from '@images/icon/icon-circle-green.png';
import IconInbox from '@images/icon/icon-inbox-dark-blue.png';
import IconCheckGrey from '@images/icon/icon-checked.png';
import IconDown from '@images/icon/icon-down.png';
import moment from 'moment';

const messageDetail = ({
  message, data,
}) => {
  const [stepStatus, setStepStatus] = React.useState('INITIATED');
  const [dataPayment, setDataPayment] = React.useState(data);
  
  React.useEffect(() => {
    if (data?.Timelines) {
      const newTimeLine = [...data.Timelines];
      setDataPayment({...data, Timelines: newTimeLine.reverse()});
      const step = newTimeLine[0].Name;
      if (step === 'Crypto delivered') {
        setStepStatus('COMPLETED');
      } else if (step === 'Ordered') {
        setStepStatus('PENDING');
      } else if (step === 'Failed to deliver crypto'){
        setStepStatus('FAILED');
      }
    }
    return () => {};
  }, []);
 
  return (
    <div className="payment-moonpay">
      <div className="flex flex-col justify-center items-center gab-10 _header">
        <div className="flex flex-row justify-center items-center gab-10 amount-wrapper">
          <div>
            <span className="mb-10 title text-blue">
              {data.SourceAmount}
              {' '}
              {data.SourceCurrency}
            </span>
          </div>
          <div className="icon-wrapper">
            <img src={IconArrowRight} />
          </div>
          <div>
            <span className="mb-10 title text-bluegrey">
              {data.DestAmount}
              {' '}
              {data.DestCurrency}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gab-10">
          <div className="text-center">
            <span className="mb-10 sub-title">
              {'From: '}
              {' '}
              {data.From}
              {' '}
              {data.PlayerWalletAddr}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gab-10 _body">
        <div className="flex justify-center items-center gab-10 steps-progress">
          <StepProgress state_pos={stepStatus} />
        </div>
        <div className="flex flex-col justify-center items-center gab-10 list-progress">
          {dataPayment?.Timelines?.map((item, i) => {
            const datetime = `${moment(item.Timestamp * 1000).format('HH:mm A')  } | ${  moment(item.Timestamp * 1000).format('MMM DD, YYYY')}`;
            const activeStep = i === 0 ? 'active' : '';
            return (
              <div className="flex flex-row items-center each-progress" key={i}>
                <div className="_icon">
                  {i > 0 && (
                    <img src={IconCheckGrey} />
                  )}
                  {i === 0 && (
                    <>
                      {item?.Name === 'Crypto delivered' ? (
                        <img src={IconCheckGrey} />
                      ) : (
                        <img src={IconCircleGreen} />
                      )}
                    </>
                  )}
                </div>
                <div className="_desc">
                  <span className={activeStep}>{item.Name}</span>
                </div>
                <div className="_datetime text-right">
                  <span className={activeStep}>{datetime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gab-10 _footer">
        <div className="_content gab-10">
          <div className="flex flex-col">
            <span className="label">Transfer ID</span>
            <span>{data.TransferId}</span>
          </div>
          <div className="flex flex-col">
            <span className="label">Rate</span>
            <span>{data.Rate}</span>
          </div>
          <div className="flex flex-col">
            <span className="label">Fee</span>
            <span>{data.Fee}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default messageDetail;
