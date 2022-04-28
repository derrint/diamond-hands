/* eslint-disable camelcase */
import React from 'react';
import IconCircleGreen from '@images/icon/icon-circle-green.png';
import IconCircleWhite from '@images/icon/icon-circle-white.png';
import IconCheck from '@images/icon/icon-check.png';

const stepProgress = ({
  state_pos,
}) => {
  const defaultSteps = [
    {
      step: 1,
      state: 'INITIATED',
    },
    {
      step: 2,
      state: 'PENDING',
    },
    {
      step: 3,
      state: 'COMPLETED',
    },
  ];
  // React.useEffect(() => {
    
  //   return () => {};
  // }, [state_pos]);
  return (
    <div className="step-progess-wrapper">
      <div className="p-5">
        <div className="mx-4 p-4">
          <div className="flex items-center">
            {defaultSteps.map((item, i) => {
              let new_pos = state_pos;
              let stateName = item.state;
              if (state_pos === 'FAILED') {
                new_pos = 'COMPLETED';
                if (item.state === 'COMPLETED') {
                  stateName = 'FAILED';
                }
              }
              const activeStep = defaultSteps.find((o) => o.state === new_pos);
              const classLineColor = item.step >= activeStep?.step ? 'border-gray-300' : 'c-border-green';
              return (
                <React.Fragment key={i}>
                  <div className="flex items-center text-purple-500 relative">
                    <div
                      className="transition duration-500 ease-in-out h-15 w-15 py-3"
                    >
                      {activeStep?.step === item.step && (
                        <>
                          {activeStep?.state === 'COMPLETED' ? (
                            <img src={stateName === 'FAILED' ? IconCircleWhite : IconCheck} />
                          ) : (
                            <img src={IconCircleGreen} />
                          )}
                        </>
                      )}
                      {activeStep?.step > item.step && (
                        <img src={IconCheck} />
                      )}
                      {activeStep?.step < item.step && (
                        <img src={IconCircleWhite} />
                      )}
                    </div>
                    <div
                      className="absolute top-0 -ml-12 text-center mt-16 w-32 text-xl font-medium uppercase c-green"
                    >
                      {stateName}
                    </div>
                  </div>
                  {item.step < defaultSteps.length && (
                    <div
                      className={`flex-auto border-t-2 transition duration-500 ease-in-out ${classLineColor}`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default stepProgress;
