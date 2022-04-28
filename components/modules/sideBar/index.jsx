import React, {useRef} from 'react';
import {Fade} from 'react-reveal';
import {useActions, useState} from '@overmind/index';
import IconArrowDown from '@images/icon/icon-arrow-down.png';

const SideBar = ({
  children, title, alignContent = 'left', isShowingArrow = true, component,
}) => {
  const ref = useRef();

  const {setWalletShowing} = useActions();
  const {isWalletShowing} = useState();

  const [open, setOpen] = React.useState(false);
  
  const toggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (open === false) {
      setWalletShowing(false);
    }
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      // console.log(e.target);
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open]);
  React.useEffect(() => {
    if (isWalletShowing) {
      setOpen(true);
    }
    return () => {};
  }, [isWalletShowing]);

  return (
    <div className="sidebar-wrapper" ref={ref}>
      <div className="sidebar-header" style={open ? {opacity: 0} : {}} onClick={() => toggle()}>
        {title && !component && (
          <div className="sidebar-header__title">
            <p className="sidebar-hader__title--bold">{title}</p>
          </div>
        )}
        {component && (
          component
        )}
        {(isShowingArrow && (
          <div className="sidebar-header__action">
            <img src={IconArrowDown} />
          </div>
        ))}
      </div>
        
      <Fade right when={open} duration={500}>
        <div
          className={`sidebar-content ${alignContent}`}
          style={open ? {visibility: 'visible'} : {visibility: 'hidden'}}
        >
          {children}
        </div>
      </Fade>
      
    </div>
  );
};

export default SideBar;
