import React from 'react';
import {useRouter} from 'next/router';

import {sectionBottomNavigasiEn} from '@data/translation';
import {Button} from '@elements';
import {FiMail} from 'react-icons/fi';
import {FaDiscord, FaYoutube, FaTwitter} from 'react-icons/fa';

/* import images */
// import IconTwitter from '@images/icon/icon-twitter.png';
// import IconYoutube from '@images/icon/icon-youtube.png';
// import IconDiscord from '@images/icon/icon-discord.png';
// import IconMail from '@images/icon/icon-mail-blue.png';

const Footer = ({isSubmenu}) => {
  const router = useRouter();

  return (
    <>
      <footer className={`${router.pathname === '/' ? 'is-home' : 'relative'} ${isSubmenu ? 'mobile-only' : 'desktop-only'}`}>
        <nav className={`container mx-auto flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center ${router.pathname === '/' ? '!py-2' : ''}`}>
          <div className="left-side flex flex-col items-center gap-10 md:gap-0 sm:flex-row mb-10 md:mb-0">
            <span className="copyright">Copyright © DiamondHands</span>
            <div className="menu flex flex-col items-center lg:ml-10 sm:flex-row gap-10 md:gap-0">
              {
              sectionBottomNavigasiEn.map((item, key) => (
                <Button
                  key={`bottom-navigasi-${key}`}
                  className="px-3 flex items-center"
                  href={item.href}
                >
                  <span className="font-weight-bold">
                    {item.label}
                  </span>
                </Button>
              ))
            }
              <Button
                className="px-3 flex flex-row align-center gap-3 items-center font-weight-bold"
                onClick={() => {
                  window.open('mailto:support@diamondhands.com?subject=Question about (your question here)', '_blank');
                }}
              >
                <FiMail size="18" className="mt-1" />
                <div>
                  support@diamondhands.com
                </div>
              </Button>
            </div>
          </div>
          <div className="right-side flex justify-center gap-3">
            <Button
              className="social-button flex flex-row align-center gap-3 items-center font-weight-bold"
              onClick={() => {
                window.open('https://discord.gg/G89yvGYefz', '_blank');
              }}
            >
              <FaDiscord size="26" />
            </Button>

            <Button
              className="social-button flex flex-row align-center gap-3 items-center font-weight-bold"
              onClick={() => {
                window.open('https://www.youtube.com/channel/UCbx3n0yQrboWvkz__M9j5SQ', '_blank');
              }}
            >
              <FaYoutube size="26" />
            </Button>

            <Button
              className="social-button flex flex-row align-center gap-3 items-center font-weight-bold"
              onClick={() => {
                window.open('https://twitter.com/DiamondHandsOFC', '_blank');
              }}
            >
              <FaTwitter size="26" />
            </Button>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
