/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Button} from '@elements';
import {StepProgress} from '@modules';
import IconArrowRight from '@images/icon/icon-arrow-right.png';
import IconCircleGreen from '@images/icon/icon-circle-green.png';
// import IconCircleWhite from '@images/icon/icon-circle-white.png';
import IconCheckGrey from '@images/icon/icon-checked.png';
import moment from 'moment';

const WyreTrackTransaction = ({detail, onPaymentModalClose}) => {
  const [stepStatus, setStepStatus] = React.useState('INITIATED');
  const [data, setData] = React.useState(detail);
  React.useEffect(async () => {
    const newTimeLine = [...detail.timeline];
    await setData({...data, timeline: newTimeLine.reverse()});
    const step = newTimeLine[0].state;
    setStepStatus(step);
    return () => {};
  }, []);

  return (
    <div className="payment-detail-transaction">
      <div className="flex flex-col items-center">
        <div className="title">Tracking USDC Transaction</div>
      </div>
      {data !== null && (
        <div className="flex flex-col">
          <div className="flex flex-col justify-center items-center gab-10 _header">
            <div className="flex flex-row justify-center items-center gab-10">
              <div>
                <span className="mb-10 title text-blue">
                  {data.destAmount}
                  {' '}
                  {data.sourceCurrency}
                </span>
              </div>
              <div className="icon-wrapper">
                <img src={IconArrowRight} />
              </div>
              <div>
                <span className="mb-10 title text-bluegrey">
                  {data.destAmount}
                  {' '}
                  {data.destCurrency}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gab-10">
              <div>
                <span className="mb-10 sub-title">
                  {'From: '}
                  {' '}
                  {`${data.from} ${data.phone}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gab-10 _body">
            <div className="flex justify-center items-center gab-10 steps-progress">
              <StepProgress state_pos={stepStatus} />
            </div>
            <div className="flex flex-col justify-center items-center gab-10 list-progress">
              {data.timeline.map((item, i) => {
                const datetime = `${moment(item.createdAt).format('HH:mm A')} | ${moment(item.createdAt).format('MMM DD, YYYY')}`;
                const activeStep = i === 0 ? 'active' : '';
                return (
                  <div className="flex flex-row items-center each-progress" key={i}>
                    <div className="_icon">
                      {i > 0 && (
                        <img src={IconCheckGrey} />
                      )}
                      {i === 0 && (
                        <>
                          {item?.state === 'COMPLETED' ? (
                            <img src={IconCheckGrey} />
                          ) : (
                            <img src={IconCircleGreen} />
                          )}
                        </>
                      )}
                    </div>
                    <div className="_desc">
                      <span className={`${activeStep}`}>{item.statusDetails}</span>
                    </div>
                    <div className="_datetime text-right">
                      <span className={`${activeStep}`}>{datetime}</span>
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
                <span>{data.transferId}</span>
              </div>
              <div className="flex flex-col">
                <span className="label">Rate</span>
                <span>
                  {data.rate}
                  {' '}
                  {data.sourceCurrency}
                  {' '}
                  =
                  {' '}
                  {data.rate}
                  {' '}
                  {data.destCurrency}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="label">Fee</span>
                <span>
                  {parseFloat(data.fee).toFixed(2)}
                  {' '}
                  {data.sourceCurrency}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button
              className="is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
              onClick={() => {
                onPaymentModalClose();
              }}
            >
              <div className="text-close">Close anyway</div>
            </Button>
          </div>
          <div className="flex flex-col items-center text-note">
            Note: you can still open this tracking page in your Inbox
          </div>
        </div>
      )}
    </div>
  );
};
export default WyreTrackTransaction;
