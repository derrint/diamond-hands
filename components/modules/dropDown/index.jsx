import React, {useEffect, useRef} from 'react';
import {Fade} from 'react-reveal';
import {useState, useActions} from '@overmind/index';
import IconArrowDown from '@images/icon/icon-arrow-down.png';

const DropDown = ({
  children, title, alignContent = 'left', isShowingArrow = true, component,
}) => {
  const ref = useRef();

  const [open, setOpen] = React.useState(false);
  const {setWalletShowing} = useActions();
  const {isWalletShowing} = useState();
  
  const toggle = () => {
    setOpen(!open);
    if (!open) {
      setWalletShowing(false);
    }
  };
  useEffect(() => {
    if (open && isWalletShowing) {
      setOpen(false);
    }
  }, [isWalletShowing]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      // console.log(e.target);
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setWalletShowing(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="dropdown-wrapper" ref={ref}>
      <div className="dropdown-wrapper" ref={ref}>
        <div className="dropdown-header" onClick={() => toggle()}>
          {
            title && !component && (
              <div className="dropdown-header__title">
                <p className="dropdown-hader__title--bold">{title}</p>
              </div>
            )
          }
          {component && (
            component
          )}
          {(isShowingArrow && (
            <div className="dropdown-header__action">
              <img src={IconArrowDown} width={20} />
            </div>
          ))}
        </div>
          
        <Fade top when={open} duration={500}>
          <div
            className={`dropdown-content ${alignContent}`}
            style={open ? {visibility: 'visible'} : {visibility: 'hidden'}}
          >
            {children}
          </div>
        </Fade>
        
      </div>
      
    </div>
  );
};

export default DropDown;
